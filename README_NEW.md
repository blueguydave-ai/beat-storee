# 🎵 David Jayy Beats - Professional Beat Store

A full-stack e-commerce platform for buying, selling, and streaming high-quality music beats. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

![Status](https://img.shields.io/badge/Status-Phase%203%20%E2%9C%85-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### User Features
- ✅ Browse beats with advanced filtering (genre, BPM, key, price)
- ✅ Full-featured audio player with speed/volume controls
- ✅ Shopping cart with persistence
- ✅ 4-tier license system (Basic, Premium, Unlimited, Exclusive)
- ✅ Multi-step secure checkout
- ✅ User account dashboard with downloads & favorites
- ✅ Beat reviews with 5-star ratings
- ✅ Wishlist/favorites system

### Payment & Billing
- ✅ Stripe integration for card payments
- ✅ Paystack integration for Africa/emerging markets
- ✅ Secure token-based downloads (48-hour expiry)
- ✅ Coupon/discount system
- ✅ Order confirmation emails with download links
- ✅ Payment status tracking

### Admin & Analytics
- ✅ Advanced analytics dashboard (revenue, sales, conversion, traffic)
- ✅ Customer management system
- ✅ Beat performance analytics per beat
- ✅ Admin beat management (create, edit, delete)
- ✅ Order management interface
- ✅ Inventory tracking

### Backend Infrastructure
- ✅ PostgreSQL database with Prisma ORM
- ✅ RESTful API with 30+ endpoints
- ✅ JWT authentication
- ✅ SendGrid email notifications
- ✅ Secure file storage and streaming
- ✅ Webhook support for payment events

## 📋 Tech Stack

**Frontend:**
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS
- React Context API for state management
- HTML5 Audio API

**Backend:**
- Next.js API Routes
- PostgreSQL database
- Prisma ORM
- Stripe API
- Paystack API
- SendGrid for emails
- JWT authentication

**Infrastructure:**
- Node.js runtime
- File system storage (or AWS S3)
- Environment-based configuration

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 12+

### Setup

```bash
# 1. Clone and install
git clone <repo>
cd beat-store
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 3. Setup database
npx prisma migrate dev --name init
npx prisma generate

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API endpoints (30+ routes)
│   ├── beat/[id]/           # Beat detail page
│   ├── beats/               # Beat catalog
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Multi-step checkout
│   ├── account/             # User dashboard
│   ├── admin/               # Admin dashboard
│   ├── login/               # Authentication
│   └── register/
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AudioPlayer.tsx
│   └── beat/
├── context/                 # React Context providers
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── FavoritesContext.tsx
├── lib/                     # Utility libraries
│   ├── stripe.ts           # Stripe integration
│   ├── paystack.ts         # Paystack integration
│   ├── sendgrid.ts         # Email service
│   ├── fileManager.ts      # File handling
│   └── helpers.ts
├── types/                   # TypeScript types
│   └── index.ts
└── utils/
    └── helpers.ts

prisma/
└── schema.prisma           # Database schema

public/
├── beats/                  # Beat files storage
└── images/

.env.local                 # Environment configuration
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Beats
- `GET /api/beats` - List beats with filters
- `POST /api/beats` - Create beat (admin)
- `GET /api/beats/[id]` - Get beat details
- `PUT /api/beats/[id]` - Update beat (admin)
- `DELETE /api/beats/[id]` - Delete beat (admin)

### Payment
- `POST /api/payment/initialize` - Start payment (Stripe/Paystack)
- `POST /api/payment/stripe/verify` - Verify Stripe payment
- `POST /api/payment/paystack/verify` - Verify Paystack payment

### Downloads
- `GET /api/download/file/[token]` - Secure beat download
- `POST /api/downloads` - Generate download token
- `GET /api/downloads` - Get user's download history

### Admin
- `GET /api/admin/analytics` - Advanced analytics
- `GET /api/admin/customers` - Customer management
- `GET /api/admin/beats/[id]/performance` - Beat performance metrics

[See complete API documentation →](./API_DOCS.md)

## 💳 Payment Integration

### Stripe Setup
1. Get test keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Enable Stripe checkout in frontend

### Paystack Setup
1. Get keys from [Paystack Dashboard](https://dashboard.paystack.co)
2. Add to `.env.local`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_...
   PAYSTACK_PUBLIC_KEY=pk_test_...
   ```
3. Enable Paystack in checkout

## 📧 Email Configuration

### SendGrid Setup
1. Create account at [SendGrid](https://sendgrid.com)
2. Get API key and verified sender
3. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxx
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

## 🗄️ Database

### Schema Highlights
- **Users:** Multiple roles (Customer, Producer, Admin)
- **Beats:** Full metadata, file references, status tracking
- **Licenses:** 4-tier pricing with feature matrix
- **Orders:** Payment tracking, order lifecycle
- **Downloads:** Secure token-based access with expiry
- **Reviews:** 5-star ratings with aggregation
- **Analytics:** Real-time metrics and insights

[View full schema →](./prisma/schema.prisma)

## 📊 Analytics

Real-time insights including:
- Revenue trends and forecasting
- Sales breakdown by license type and genre
- Conversion funnel analysis
- Traffic source tracking
- Customer lifetime value metrics
- Beat performance metrics
- Inventory analysis

## 🔐 Security

- 🔒 JWT authentication with secure tokens
- 🔐 Stripe/Paystack PCI compliance
- 🛡️ Path traversal protection in file downloads
- 🔑 Token-based download access (48-hour expiry)
- 📝 Webhook signature verification
- 🚫 XSS and CSRF protection via Next.js

## 📚 Documentation

- [API Documentation](./API_DOCS.md) - Complete endpoint reference
- [API Quick Reference](./API_QUICK_REFERENCE.md) - Cheat sheet
- [Phase 3 Summary](./PHASE3_SUMMARY.md) - Advanced features overview
- [Integration Guide](./INTEGRATION_GUIDE.md) - Production setup steps

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Environment Variables (Production)
```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG.xxx
JWT_SECRET=your-production-secret
```

[See detailed deployment guide →](./INTEGRATION_GUIDE.md#-deployment-steps)

## 📈 Development Roadmap

**Phase 1 - Foundation** ✅
- Project structure and authentication
- Database setup with Prisma
- Context API providers

**Phase 2 - Core Features** ✅
- Beat catalog and shopping cart
- Multi-step checkout
- Admin dashboard
- 30+ API endpoints

**Phase 3 - Advanced Features** ✅
- Stripe & Paystack integration
- SendGrid email system
- File management and streaming
- Advanced analytics
- Customer management

**Phase 4 - Future** 🔄
- Webhook handlers
- AI recommendations
- Affiliate program
- Mobile app (PWA)
- Multi-currency support

## 📝 Environment Configuration

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/beat_store

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Paystack
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@davidjayy.com

# JWT
JWT_SECRET=your-secret-key

# File Storage
FILE_STORAGE_PATH=./public/beats
MAX_FILE_SIZE=314572800

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint
```

## 📦 Dependencies

**Key Libraries:**
- `next` (16.1.1)
- `react` (19.2.3)
- `typescript` (5.x)
- `prisma` (database ORM)
- `stripe` (payment processing)
- `@sendgrid/mail` (email service)
- `tailwindcss` (styling)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Author

**David Jayy** - Beat Store Creator

## 📞 Support

For issues and questions:
- GitHub Issues: [Open an issue](../../issues)
- Documentation: [Read the docs](./docs)
- Email: support@davidjayy.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Stripe and Paystack for payment processing
- SendGrid for email service
- Tailwind Labs for Tailwind CSS

---

**Status:** Production Ready (Phase 3 ✅)  
**Last Updated:** December 23, 2025  
**Version:** 1.0.0
