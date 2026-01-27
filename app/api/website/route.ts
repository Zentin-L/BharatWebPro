import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../../../lib/auth';
import websiteGeneratorService from '../../../lib/services/website-generator';
import prisma from '../../../lib/prisma';

const isAdmin = (session: any) => {
  const role = session?.user?.role;
  return role === 'ADMIN' || role === 'SUPERADMIN';
};

const isOwner = (session: any, ownerId?: string | null) => {
  return session?.user?.id && ownerId && session.user.id === ownerId;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { businessId, language = 'en' } = body || {};

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { owner: true },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    if (!isOwner(session, business.ownerId) && !isAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const existingWebsite = await prisma.website.findUnique({ where: { businessId } });
    if (existingWebsite) {
      return NextResponse.json({ error: 'Website already exists for this business' }, { status: 400 });
    }

    const website = await websiteGeneratorService.createWebsite(businessId, language as 'en' | 'hi');

    const completeWebsite = await prisma.website.findUnique({
      where: { id: website.id },
      include: { pages: true, business: true },
    });

    return NextResponse.json({ success: true, data: completeWebsite });
  } catch (error: any) {
    console.error('Website Generation API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate website' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const websiteId = searchParams.get('id');
    const businessId = searchParams.get('businessId');

    if (!websiteId && !businessId) {
      return NextResponse.json({ error: 'Website ID or Business ID is required' }, { status: 400 });
    }

    const website = await prisma.website.findFirst({
      where: websiteId ? { id: websiteId } : { businessId: businessId! },
      include: {
        pages: true,
        business: { include: { owner: true } },
      },
    });

    if (!website) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    if (!isOwner(session, website.business.ownerId) && !isAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: website });
  } catch (error: any) {
    console.error('Get Website API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch website' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { websiteId, ...updateData } = body || {};

    if (!websiteId) {
      return NextResponse.json({ error: 'Website ID is required' }, { status: 400 });
    }

    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: { business: true },
    });

    if (!website) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    if (!isOwner(session, website.business.ownerId) && !isAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedWebsite = await prisma.website.update({
      where: { id: websiteId },
      data: updateData,
      include: { pages: true, business: true },
    });

    return NextResponse.json({ success: true, data: updatedWebsite });
  } catch (error: any) {
    console.error('Update Website API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update website' }, { status: 500 });
  }
}
