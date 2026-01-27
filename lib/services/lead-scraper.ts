import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from '../prisma';

interface ScrapedBusiness {
  name: string;
  phone: string;
  address: string;
  city: string;
  type: string;
  hasWebsite: boolean;
  source: string;
}

class LeadScraperService {
  /** Scrape Google Maps for businesses */
  async scrapeGoogleMaps(city: string, businessType: string, limit: number = 50): Promise<ScrapedBusiness[]> {
    try {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) throw new Error('Google Places API key not configured');

      const query = `${businessType} in ${city}`;
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: { query, key: apiKey },
      });

      const businesses: ScrapedBusiness[] = [];

      if (response.data.results) {
        for (const place of response.data.results.slice(0, limit)) {
          const detailsResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
              place_id: place.place_id,
              fields: 'name,formatted_phone_number,formatted_address,website',
              key: apiKey,
            },
          });

          const details = detailsResponse.data.result;

          if (details?.formatted_phone_number) {
            businesses.push({
              name: details.name,
              phone: details.formatted_phone_number.replace(/\s/g, ''),
              address: details.formatted_address,
              city,
              type: businessType,
              hasWebsite: !!details.website,
              source: 'google_maps',
            });
          }
        }
      }

      return businesses;
    } catch (error) {
      console.error('Google Maps Scraping Error:', error);
      return [];
    }
  }

  /** Scrape JustDial for businesses */
  async scrapeJustDial(city: string, businessType: string, limit: number = 50): Promise<ScrapedBusiness[]> {
    try {
      const citySlug = city.toLowerCase().replace(/\s/g, '-');
      const typeSlug = businessType.toLowerCase().replace(/\s/g, '-');
      const url = `https://www.justdial.com/${citySlug}/${typeSlug}`;

      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);
      const businesses: ScrapedBusiness[] = [];

      $('.store-details').each((i, element) => {
        if (i >= limit) return false;

        const name = $(element).find('.store-name').text().trim();
        const phone = $(element).find('.tel').text().trim();
        const address = $(element).find('.address').text().trim();
        const hasWebsite = $(element).find('.website').length > 0;

        if (name && phone) {
          businesses.push({
            name,
            phone: phone.replace(/\D/g, ''),
            address,
            city,
            type: businessType,
            hasWebsite,
            source: 'justdial',
          });
        }
      });

      return businesses;
    } catch (error) {
      console.error('JustDial Scraping Error:', error);
      return [];
    }
  }

  /** Check if business already exists in database */
  async businessExists(phone: string): Promise<boolean> {
    const existing = await prisma.business.findFirst({ where: { phone } });
    return !!existing;
  }

  /** Save scraped leads to database */
  async saveLeads(businesses: ScrapedBusiness[]) {
    const savedLeads = [] as any[];

    for (const business of businesses) {
      try {
        const exists = await this.businessExists(business.phone);
        if (exists) continue;
        if (business.hasWebsite) continue;

        const user = await prisma.user.create({
          data: {
            phone: business.phone,
            name: business.name,
            role: 'CLIENT',
          },
        });

        const savedBusiness = await prisma.business.create({
          data: {
            name: business.name,
            phone: business.phone,
            address: business.address,
            city: business.city,
            state: this.getCityState(business.city),
            type: this.mapBusinessType(business.type),
            status: 'LEAD',
            source: business.source,
            ownerId: user.id,
          },
        });

        savedLeads.push(savedBusiness);
      } catch (error) {
        console.error(`Error saving lead ${business.name}:`, error);
      }
    }

    return savedLeads;
  }

  /** Map business type string to enum */
  private mapBusinessType(type: string): string {
    const typeMapping: Record<string, string> = {
      'grocery store': 'KIRANA',
      'kirana': 'KIRANA',
      'restaurant': 'RESTAURANT',
      'clinic': 'CLINIC',
      'doctor': 'CLINIC',
      'salon': 'SALON',
      'beauty parlor': 'SALON',
      'coaching': 'COACHING',
      'tuition': 'COACHING',
      'real estate': 'REAL_ESTATE',
      'travel agency': 'TRAVEL_AGENCY',
      'lawyer': 'LEGAL',
      'advocate': 'LEGAL',
      'ca': 'TAX_CONSULTANT',
      'chartered accountant': 'TAX_CONSULTANT',
      'pharmacy': 'MEDICAL_STORE',
      'medical store': 'MEDICAL_STORE',
    };

    const normalized = type.toLowerCase();
    return typeMapping[normalized] || 'OTHER';
  }

  /** Get state from city name */
  private getCityState(city: string): string {
    const cityStateMap: Record<string, string> = {
      mumbai: 'Maharashtra',
      delhi: 'Delhi',
      bangalore: 'Karnataka',
      bengaluru: 'Karnataka',
      hyderabad: 'Telangana',
      chennai: 'Tamil Nadu',
      kolkata: 'West Bengal',
      pune: 'Maharashtra',
      ahmedabad: 'Gujarat',
      jaipur: 'Rajasthan',
      lucknow: 'Uttar Pradesh',
      kanpur: 'Uttar Pradesh',
      nagpur: 'Maharashtra',
      indore: 'Madhya Pradesh',
      bhopal: 'Madhya Pradesh',
      visakhapatnam: 'Andhra Pradesh',
      patna: 'Bihar',
      vadodara: 'Gujarat',
      ghaziabad: 'Uttar Pradesh',
      ludhiana: 'Punjab',
    };

    return cityStateMap[city.toLowerCase()] || 'Unknown';
  }

  /** Run scraping for a city and business type */
  async runScraping(city: string, businessType: string) {
    console.log(`Starting scraping for ${businessType} in ${city}`);

    const [googleLeads, justDialLeads] = await Promise.all([
      this.scrapeGoogleMaps(city, businessType, 30),
      this.scrapeJustDial(city, businessType, 20),
    ]);

    const allLeads = [...googleLeads, ...justDialLeads];
    console.log(`Found ${allLeads.length} leads`);

    const savedLeads = await this.saveLeads(allLeads);
    console.log(`Saved ${savedLeads.length} new leads`);

    return {
      total: allLeads.length,
      saved: savedLeads.length,
      leads: savedLeads,
    };
  }
}

export const leadScraperService = new LeadScraperService();
export default leadScraperService;
