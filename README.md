# BharatWebPro - Website-as-a-Service Platform

![BharatWebPro](https://img.shields.io/badge/BharatWebPro-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

**हर भारतीय व्यवसाय के लिए स्वचालित वेबसाइट सेवा**  
(Automated Website Service for Every Indian Business)

A complete full-stack Website-as-a-Service (WAAS) platform specifically designed for the Indian market. Automatically finds small businesses without websites, builds them professional Indian-optimized websites, and handles end-to-end delivery with Indian payment methods and compliance.

## 🌟 Features

### Core Features
- ✅ **Automated Lead Scraping**: Find businesses without websites from Google Maps, JustDial, etc.
- ✅ **AI Website Generator**: Automatically creates professional websites in Hindi/English
- ✅ **Multi-language Support**: Hindi + English with easy language switching
- ✅ **Indian Payment Integration**: Razorpay, UPI, Paytm, PhonePe, Google Pay
- ✅ **GST Compliance**: Automatic GST invoice generation
- ✅ **WhatsApp Integration**: Business messaging and customer support
- ✅ **SEO Optimization**: Google Business Profile setup included
- ✅ **Mobile-First Design**: JioPhone compatible websites
- ✅ **E-commerce Ready**: Product catalog and payment gateway integration
- ✅ **Admin Dashboard**: Complete CRM for lead management
- ✅ **Client Portal**: Self-service website management for clients

### Technical Features
- 🚀 Built with Next.js 14 (App Router)
- 💪 TypeScript for type safety
- 🎨 Tailwind CSS + shadcn/ui for beautiful UI
- 🗄️ PostgreSQL database with Prisma ORM
- 🔐 NextAuth.js authentication with OTP support
- 💳 Razorpay payment gateway integration
- 📧 Email automation with Resend
- 📱 SMS/WhatsApp automation
- 🔄 Background job processing with BullMQ
- 📊 Analytics dashboard with Recharts
- 🌐 Multi-language i18n support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Redis** (Optional, for queue management) ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/downloads))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Zentin-L/bharatwebpro.git
cd bharatwebpro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bharatwebpro"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Razorpay
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# SMS (Twilio or TextLocal)
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"

# Google Maps API
GOOGLE_MAPS_API_KEY="your_google_maps_key"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"
```

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bharatwebpro/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── leads/                # Lead management APIs
│   │   ├── website/              # Website generation APIs
│   │   └── payment/              # Payment processing APIs
│   ├── admin/                    # Admin dashboard pages
│   ├── client/                   # Client portal pages
│   └── (marketing)/              # Public marketing pages
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin components
│   └── client/                   # Client components
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth configuration
│   ├── razorpay.ts               # Payment service
│   ├── lead-scraper.ts           # Lead scraping service
│   └── website-generator.ts      # Website generation service
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Prisma schema
├── public/                       # Static assets
├── styles/                       # Global styles
└── types/                        # TypeScript type definitions
```

## 🎯 Core Services

### 1. Lead Scraper Service

Automatically finds businesses without websites:

```typescript
import leadScraperService from '@/lib/lead-scraper';

// Scrape leads for a city and business type
const result = await leadScraperService.runScraping('Mumbai', 'Restaurant');
```

**Features:**
- Google Maps API integration
- JustDial scraping
- Duplicate detection
- Automatic database insertion

### 2. Website Generator Service

Creates professional websites automatically:

```typescript
import websiteGeneratorService from '@/lib/website-generator';

// Generate website for a business
the website = await websiteGeneratorService.createWebsite(businessId, 'hi');
```

**Features:**
- AI content generation in Hindi/English
- Industry-specific templates
- Multi-page website creation
- SEO optimization
- Mobile-responsive design

### 3. Payment Service

Handles Indian payment methods:

```typescript
import razorpayService from '@/lib/razorpay';

// Create payment order
const order = await razorpayService.createOrder({
  amount: 14999,
  gstAmount: 2699,
  totalAmount: 17699,
});
```

**Features:**
- Razorpay integration
- UPI payment support
- GST calculation
- Invoice generation
- Refund processing

## 💳 Pricing Plans

### One-Time Packages

| Plan | Price | With GST | Features |
|------|-------|----------|----------|
| **Basic** | ₹14,999 | ₹17,699 | 5-Page Website, Domain, Email, SEO |
| **Premium** | ₹29,999 | ₹35,399 | Everything + E-commerce, WhatsApp |
| **Enterprise** | ₹59,999 | ₹70,799 | Everything + CRM, Analytics |

### Monthly Subscription

| Plan | Price/month | Features |
|------|-------------|----------|
| **Starter** | ₹999 + GST | Basic Website, Hosting, Support |
| **Business** | ₹2,499 + GST | E-commerce, SEO, Analytics |
| **Enterprise** | ₹4,999 + GST | Custom Features, Priority Support |

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout

### Leads
- `POST /api/leads/scrape` - Scrape leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead details
- `PATCH /api/leads/:id` - Update lead

### Websites
- `POST /api/website/generate` - Generate website
- `GET /api/website/generate` - Get website details
- `PATCH /api/website/generate` - Update website
- `POST /api/website/deploy` - Deploy website

### Payments
- `POST /api/payment/order` - Create payment order
- `PATCH /api/payment/order` - Verify payment
- `GET /api/payment/order` - Get payment details

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Database

**Option 1: Supabase (Recommended for MVP)**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy DATABASE_URL
4. Run migrations: `npx prisma migrate deploy`

**Option 2: Railway**
1. Create account at [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string
4. Deploy application

### Deploy Redis (Optional)

Use [Upstash](https://upstash.com) for serverless Redis:
1. Create account
2. Create Redis database
3. Copy REDIS_URL

## 📊 Database Schema

The platform uses PostgreSQL with the following main tables:

- **User**: User accounts (clients and admins)
- **Business**: Business information and leads
- **Website**: Generated websites
- **Page**: Website pages and content
- **Payment**: Payment transactions
- **Communication**: WhatsApp/SMS/Email logs
- **Analytics**: Website analytics data
- **Template**: Website templates

See `prisma/schema.prisma` for complete schema.

## 🔐 Security

- ✅ NextAuth.js for authentication
- ✅ OTP-based login for Indian users
- ✅ Role-based access control (RBAC)
- ✅ SQL injection protection via Prisma
- ✅ CORS configuration
- ✅ Rate limiting on APIs
- ✅ Secure payment processing
- ✅ Data encryption at rest

## 🇮🇳 Indian Compliance

- ✅ GST invoice generation (18% tax)
- ✅ Data localization (stores data in India)
- ✅ UPI payment integration
- ✅ Hindi language support
- ✅ Indian business types (Kirana, Clinic, etc.)
- ✅ Indian cities and states
- ✅ Terms and Privacy in Hindi + English

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 📈 Monitoring & Analytics

The platform includes built-in analytics:

- Website visitor tracking
- Conversion rate monitoring
- Revenue analytics by city
- Lead source tracking
- Payment success rates
- Customer acquisition cost (CAC)

## 🛠️ Development

### Adding New Features

1. **New API Endpoint**:
```typescript
// app/api/your-endpoint/route.ts
export async function GET(req: NextRequest) {
  // Your logic here
}
```

2. **New Database Model**:
```prisma
// prisma/schema.prisma
model YourModel {
  id String @id @default(cuid())
  // Your fields here
}
```

Run: `npx prisma migrate dev --name add_your_model`

3. **New Page**:
```typescript
// app/your-page/page.tsx
export default function YourPage() {
  return <div>Your content</div>
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support:
- 📧 Email: support@bharatwebpro.in
- 📱 Phone: +91 98765 43210
- 💬 WhatsApp: +91 98765 43210
- 🌐 Website: [bharatwebpro.in](https://bharatwebpro.in)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Razorpay](https://razorpay.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ in India for Indian Businesses

**BharatWebPro** - हर भारतीय व्यवसाय के लिए स्वचालित वेबसाइट सेवा
