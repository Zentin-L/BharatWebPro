import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import leadScraperService from '@/lib/services/lead-scraper';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session as any)?.user?.role;
    if (!session || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { city, businessType } = body || {};

    if (!city || !businessType) {
      return NextResponse.json({ error: 'City and business type are required' }, { status: 400 });
    }

    const result = await leadScraperService.runScraping(city, businessType);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Scraping API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to scrape leads' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session as any)?.user?.role;
    if (!session || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const businessType = searchParams.get('businessType');

    // TODO: return scraping history when stored in DB
    return NextResponse.json({ success: true, data: [], city, businessType });
  } catch (error: any) {
    console.error('Get Scraping History Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch history' }, { status: 500 });
  }
}
