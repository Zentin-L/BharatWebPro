import prisma from '../prisma';
import { BusinessType } from '@prisma/client';

interface WebsiteContent {
  title: string;
  tagline: string;
  description: string;
  pages: {
    slug: string;
    title: string;
    content: any;
  }[];
}

class WebsiteGeneratorService {
  /** Generate website content based on business details */
  async generateWebsiteContent(businessId: string, language: 'en' | 'hi' = 'en'): Promise<WebsiteContent> {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { owner: true },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    // Get template based on business type
    const template = await this.getTemplate(business.type);

    // Generate content for each page
    const pages = await this.generatePages(business, language, template);

    return {
      title: business.name,
      tagline: this.generateTagline(business.type, language),
      description: this.generateDescription(business, language),
      pages,
    };
  }

  /** Create website in database */
  async createWebsite(businessId: string, language: 'en' | 'hi' = 'en') {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    // Generate website content
    const content = await this.generateWebsiteContent(businessId, language);

    // Generate domain name
    const domain = this.generateDomain(business.name);
    const subdomain = `${domain}.bharatwebpro.in`;

    // Create website
    const website = await prisma.website.create({
      data: {
        businessId,
        domain: subdomain,
        subdomain: domain,
        template: this.getTemplateSlug(business.type),
        title: content.title,
        tagline: content.tagline,
        description: content.description,
        status: 'DRAFT',
        languages: [language],
        hasWhatsApp: !!business.whatsapp,
      },
    });

    // Create pages
    for (const page of content.pages) {
      await prisma.page.create({
        data: {
          websiteId: website.id,
          title: page.title,
          slug: page.slug,
          content: page.content,
          isPublished: false,
          order: this.getPageOrder(page.slug),
        },
      });
    }

    return website;
  }

  /** Get template based on business type */
  private async getTemplate(businessType: BusinessType) {
    const template = await prisma.template.findFirst({
      where: {
        category: businessType,
        isActive: true,
      },
    });

    return template || this.getDefaultTemplate();
  }

  /** Get default template structure */
  private getDefaultTemplate() {
    return {
      structure: {
        header: ['logo', 'navigation', 'cta'],
        sections: ['hero', 'about', 'services', 'gallery', 'testimonials', 'contact'],
        footer: ['info', 'links', 'social', 'copyright'],
      },
    };
  }

  /** Generate pages for website */
  private async generatePages(business: any, language: string, template: any) {
    const pages = [
      {
        slug: 'home',
        title: language === 'hi' ? 'होम' : 'Home',
        content: this.generateHomePage(business, language),
      },
      {
        slug: 'about',
        title: language === 'hi' ? 'हमारे बारे में' : 'About Us',
        content: this.generateAboutPage(business, language),
      },
      {
        slug: 'services',
        title: language === 'hi' ? 'सेवाएं' : 'Services',
        content: this.generateServicesPage(business, language),
      },
      {
        slug: 'gallery',
        title: language === 'hi' ? 'गैलरी' : 'Gallery',
        content: this.generateGalleryPage(business, language),
      },
      {
        slug: 'contact',
        title: language === 'hi' ? 'संपर्क करें' : 'Contact Us',
        content: this.generateContactPage(business, language),
      },
    ];

    return pages;
  }

  /** Generate home page content */
  private generateHomePage(business: any, language: string) {
    const content = {
      hero: {
        headline: language === 'hi'
          ? `${business.name} में आपका स्वागत है`
          : `Welcome to ${business.name}`,
        subheadline: this.generateTagline(business.type, language),
        cta: {
          text: language === 'hi' ? 'अभी संपर्क करें' : 'Contact Us Now',
          link: '/contact',
        },
        image: '/placeholder-hero.jpg',
      },
      features: this.getBusinessFeatures(business.type, language),
      whyChooseUs: {
        title: language === 'hi' ? 'हमें क्यों चुनें' : 'Why Choose Us',
        points: [
          language === 'hi' ? 'अनुभवी और विश्वसनीय' : 'Experienced & Trusted',
          language === 'hi' ? 'गुणवत्तापूर्ण सेवा' : 'Quality Service',
          language === 'hi' ? 'सस्ती कीमतें' : 'Affordable Prices',
          language === 'hi' ? 'ग्राहक संतुष्टि' : 'Customer Satisfaction',
        ],
      },
    };

    return content;
  }

  /** Generate about page content */
  private generateAboutPage(business: any, language: string) {
    return {
      title: language === 'hi' ? 'हमारे बारे में' : 'About Us',
      description: language === 'hi'
        ? `${business.name} ${business.city} में स्थित एक प्रमुख ${this.getBusinessTypeLabel(business.type, language)} है। हम अपने ग्राहकों को उच्च गुणवत्ता वाली सेवाएं प्रदान करने के लिए प्रतिबद्ध हैं।`
        : `${business.name} is a leading ${this.getBusinessTypeLabel(business.type, language)} located in ${business.city}. We are committed to providing high-quality services to our customers.`,
      location: {
        address: business.address,
        city: business.city,
        state: business.state,
      },
      contact: {
        phone: business.phone,
        whatsapp: business.whatsapp,
      },
    };
  }

  /** Generate services page content */
  private generateServicesPage(business: any, language: string) {
    const services = this.getBusinessServices(business.type, language);

    return {
      title: language === 'hi' ? 'हमारी सेवाएं' : 'Our Services',
      services: services.map((service: string) => ({
        name: service,
        description: language === 'hi'
          ? `हम उच्च गुणवत्ता वाली ${service} प्रदान करते हैं।`
          : `We provide high-quality ${service}.`,
        icon: '✓',
      })),
    };
  }

  /** Generate gallery page content */
  private generateGalleryPage(business: any, language: string) {
    return {
      title: language === 'hi' ? 'गैलरी' : 'Gallery',
      description: language === 'hi'
        ? 'हमारे कार्य की झलकियां'
        : 'Glimpses of our work',
      images: [
        { url: '/placeholder-1.jpg', caption: 'Image 1' },
        { url: '/placeholder-2.jpg', caption: 'Image 2' },
        { url: '/placeholder-3.jpg', caption: 'Image 3' },
      ],
    };
  }

  /** Generate contact page content */
  private generateContactPage(business: any, language: string) {
    return {
      title: language === 'hi' ? 'संपर्क करें' : 'Contact Us',
      description: language === 'hi'
        ? 'किसी भी पूछताछ के लिए हमसे संपर्क करें'
        : 'Get in touch with us for any inquiries',
      contact: {
        phone: business.phone,
        whatsapp: business.whatsapp,
        address: business.address,
        city: business.city,
        state: business.state,
      },
      businessHours: {
        weekdays: language === 'hi' ? 'सोमवार - शनिवार: 9:00 AM - 8:00 PM' : 'Monday - Saturday: 9:00 AM - 8:00 PM',
        sunday: language === 'hi' ? 'रविवार: बंद' : 'Sunday: Closed',
      },
      map: {
        enabled: true,
        address: business.address,
      },
    };
  }

  /** Generate tagline based on business type */
  private generateTagline(type: BusinessType, language: string): string {
    const taglines: Record<BusinessType, { en: string; hi: string }> = {
      KIRANA: {
        en: 'Your Daily Needs, Delivered Fresh',
        hi: 'आपकी रोजमर्रा की जरूरतें, ताजा डिलीवर',
      },
      RESTAURANT: {
        en: 'Delicious Food, Memorable Experiences',
        hi: 'स्वादिष्ट भोजन, यादगार अनुभव',
      },
      CLINIC: {
        en: 'Your Health, Our Priority',
        hi: 'आपका स्वास्थ्य, हमारी प्राथमिकता',
      },
      SALON: {
        en: 'Look Good, Feel Great',
        hi: 'अच्छे दिखें, बेहतर महसूस करें',
      },
      COACHING: {
        en: 'Empowering Students for Success',
        hi: 'सफलता के लिए छात्रों को सशक्त बनाना',
      },
      REAL_ESTATE: {
        en: 'Your Dream Home Awaits',
        hi: 'आपका सपनों का घर इंतजार कर रहा है',
      },
      TRAVEL_AGENCY: {
        en: 'Making Your Travel Dreams Come True',
        hi: 'आपके यात्रा सपनों को साकार करना',
      },
      LEGAL: {
        en: 'Expert Legal Solutions',
        hi: 'विशेषज्ञ कानूनी समाधान',
      },
      TAX_CONSULTANT: {
        en: 'Smart Tax Solutions',
        hi: 'स्मार्ट टैक्स समाधान',
      },
      MEDICAL_STORE: {
        en: 'Your Trusted Healthcare Partner',
        hi: 'आपका विश्वसनीय स्वास्थ्य साथी',
      },
      ELECTRONICS: {
        en: 'Latest Electronics at Best Prices',
        hi: 'बेहतरीन कीमतों पर नवीनतम इलेक्ट्रॉनिक्स',
      },
      CLOTHING: {
        en: 'Fashion That Defines You',
        hi: 'फैशन जो आपको परिभाषित करता है',
      },
      JEWELLERY: {
        en: 'Elegance in Every Piece',
        hi: 'हर टुकड़े में शालीनता',
      },
      GYM: {
        en: 'Transform Your Body, Transform Your Life',
        hi: 'अपने शरीर को बदलें, अपने जीवन को बदलें',
      },
      OTHER: {
        en: 'Quality Service, Trusted Partner',
        hi: 'गुणवत्तापूर्ण सेवा, विश्वसनीय साथी',
      },
    };

    return taglines[type]?.[language] || taglines.OTHER[language];
  }

  /** Generate description */
  private generateDescription(business: any, language: string): string {
    if (language === 'hi') {
      return `${business.name} ${business.city} में स्थित है। हम उच्च गुणवत्ता वाली सेवाएं प्रदान करते हैं।`;
    }
    return `${business.name} is located in ${business.city}. We provide high-quality services.`;
  }

  /** Get business type label */
  private getBusinessTypeLabel(type: BusinessType, language: string): string {
    const labels: Record<BusinessType, { en: string; hi: string }> = {
      KIRANA: { en: 'Grocery Store', hi: 'किराना स्टोर' },
      RESTAURANT: { en: 'Restaurant', hi: 'रेस्तरां' },
      CLINIC: { en: 'Clinic', hi: 'क्लिनिक' },
      SALON: { en: 'Salon', hi: 'सैलून' },
      COACHING: { en: 'Coaching Center', hi: 'कोचिंग सेंटर' },
      REAL_ESTATE: { en: 'Real Estate', hi: 'रियल एस्टेट' },
      TRAVEL_AGENCY: { en: 'Travel Agency', hi: 'ट्रैवल एजेंसी' },
      LEGAL: { en: 'Legal Services', hi: 'कानूनी सेवाएं' },
      TAX_CONSULTANT: { en: 'Tax Consultant', hi: 'टैक्स सलाहकार' },
      MEDICAL_STORE: { en: 'Medical Store', hi: 'मेडिकल स्टोर' },
      ELECTRONICS: { en: 'Electronics', hi: 'इलेक्ट्रॉनिक्स' },
      CLOTHING: { en: 'Clothing', hi: 'कपड़े' },
      JEWELLERY: { en: 'Jewellery', hi: 'ज्वेलरी' },
      GYM: { en: 'Gym', hi: 'जिम' },
      OTHER: { en: 'Business', hi: 'व्यवसाय' },
    };

    return labels[type]?.[language] || labels.OTHER[language];
  }

  /** Get business features */
  private getBusinessFeatures(type: BusinessType, language: string): any[] {
    // Return default features based on business type
    return [
      {
        icon: '⭐',
        title: language === 'hi' ? 'गुणवत्ता' : 'Quality',
        description: language === 'hi' ? 'उच्च गुणवत्ता वाली सेवा' : 'High-quality service',
      },
      {
        icon: '💰',
        title: language === 'hi' ? 'सस्ती कीमत' : 'Affordable',
        description: language === 'hi' ? 'प्रतिस्पर्धी मूल्य' : 'Competitive pricing',
      },
      {
        icon: '🚀',
        title: language === 'hi' ? 'तेज़ सेवा' : 'Fast Service',
        description: language === 'hi' ? 'त्वरित और कुशल' : 'Quick and efficient',
      },
    ];
  }

  /** Get business services */
  private getBusinessServices(type: BusinessType, language: string): string[] {
    // Return default services based on business type
    const services: Record<BusinessType, { en: string[]; hi: string[] }> = {
      KIRANA: {
        en: ['Groceries', 'Vegetables', 'Fruits', 'Daily Needs'],
        hi: ['किराना', 'सब्जियां', 'फल', 'दैनिक आवश्यकताएं'],
      },
      RESTAURANT: {
        en: ['Dine-in', 'Takeaway', 'Home Delivery', 'Catering'],
        hi: ['डाइन-इन', 'टेकअवे', 'होम डिलीवरी', 'कैटरिंग'],
      },
      CLINIC: {
        en: ['Consultation', 'Treatment', 'Lab Tests', 'Health Checkup'],
        hi: ['परामर्श', 'उपचार', 'लैब टेस्ट', 'स्वास्थ्य जांच'],
      },
      SALON: {
        en: ['Haircut', 'Styling', 'Spa', 'Grooming'],
        hi: ['हेयरकट', 'स्टाइलिंग', 'स्पा', 'ग्रूमिंग'],
      },
      COACHING: {
        en: ['Regular Classes', 'Test Series', 'Study Material', 'Doubt Clearing'],
        hi: ['नियमित कक्षाएं', 'टेस्ट सीरीज', 'अध्ययन सामग्री', 'संदेह निवारण'],
      },
      OTHER: {
        en: ['Service 1', 'Service 2', 'Service 3'],
        hi: ['सेवा 1', 'सेवा 2', 'सेवा 3'],
      },
    };

    return services[type]?.[language] || services.OTHER[language];
  }

  /** Generate domain from business name */
  private generateDomain(businessName: string): string {
    return businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }

  /** Get template slug from business type */
  private getTemplateSlug(type: BusinessType): string {
    return type.toLowerCase();
  }

  /** Get page order */
  private getPageOrder(slug: string): number {
    const order: Record<string, number> = {
      home: 1,
      about: 2,
      services: 3,
      gallery: 4,
      contact: 5,
    };

    return order[slug] || 99;
  }
}

export const websiteGeneratorService = new WebsiteGeneratorService();
export default websiteGeneratorService;
