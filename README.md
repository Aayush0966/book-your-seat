# 🎬 Book Your Seat

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, full-stack movie ticket booking platform built with Next.js 15, featuring real-time seat selection, secure payment integration, and comprehensive admin management.

## 🧪 Test Credentials

### 🔐 User Login Credentials
For testing the application, use these credentials:
- **Email**: `test@gmail.com`
- **Password**: `test123`

### 💳 Payment Gateway Test Credentials

**⚠️ Important**: Always use test credentials for payment testing. Never use real payment details during development or testing.

#### eSewa Test Credentials
- **Test eSewa ID**: `9806800001/2/3/4/5`
- **Test OTP**: `123456`
- **Test Password**: `Nepal@123`

#### Khalti Test Credentials
- **Test Khalti IDs**: 
  - `9800000000`
  - `9800000001` 
  - `9800000002`
  - `9800000003`
  - `9800000004`
  - `9800000005`
- **Test MPIN**: `1111`
- **Test OTP**: `987654`

> **Note**: These are official test credentials provided by eSewa and Khalti for development and testing purposes. Do not use real payment credentials on the website.

## 🌟 Features

### 🎭 User Features
- **Movie Discovery**: Browse latest movies with detailed information
- **Smart Seat Selection**: Interactive seat map with responsive design
- **Secure Booking**: End-to-end encrypted booking process with OTP verification
- **Multiple Payment Options**: Support for eSewa and Khalti payment gateways
- **Digital Tickets**: QR code-enabled tickets with PDF download
- **User Profiles**: Manage bookings, view history, and update preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🛠️ Admin Features
- **Dashboard Analytics**: Real-time booking statistics and revenue insights
- **Movie Management**: Add, edit, and manage movie listings with rich media
- **Show Scheduling**: Create and manage show times across multiple screens
- **User Management**: Monitor user activity and manage accounts
- **Booking Oversight**: Track all bookings with detailed analytics
- **Coupon System**: Create and manage discount coupons
- **Screen Configuration**: Manage theater screens and seating arrangements

### 🔐 Security Features
- **NextAuth.js Integration**: Secure authentication with multiple providers
- **OTP Verification**: Two-factor authentication for bookings
- **JWT Tokens**: Secure API authentication
- **Input Validation**: Comprehensive validation using Zod schemas
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + Tailwind Animate
- **UI Components**: Radix UI primitives, Shadcn
- **State Management**: React context
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Email**: EmailJS + Nodemailer

### DevOps & Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky
- **Commit Convention**: Conventional Commits
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL** (v14.0 or higher)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Aayush0966/book-your-seat.git
cd book-your-seat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/book_your_seat"
DIRECT_URL="postgresql://username:password@localhost:5432/book_your_seat"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration
EMAILJS_SERVICE_ID="your-emailjs-service-id"
EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
EMAILJS_PUBLIC_KEY="your-emailjs-public-key"

# Admin Email Configuration
NEXT_PUBLIC_MY_EMAIL="your-email@example.com"  # Optional: Set your email to receive admin OTPs

# Payment Gateways
ESEWA_MERCHANT_ID="your-esewa-merchant-id"
KHALTI_SECRET_KEY="your-khalti-secret-key"

# External APIs
TMDB_API_KEY="your-tmdb-api-key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npm run prisma:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
book-your-seat/
├── prisma/
│   ├── migrations/          # Database migrations
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts            # Database seeding
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (admin)/       # Admin routes
│   │   ├── (user)/        # User routes
│   │   ├── api/           # API routes
│   │   └── auth/          # Authentication pages
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── ui/            # Base UI components
│   │   └── user/          # User-specific components
│   ├── context/           # React contexts
│   ├── database/          # Database utilities
│   ├── lib/               # Utility functions
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   └── validators/        # Zod validation schemas
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🎯 Usage

### For Users

1. **Browse Movies**: Visit the home page to see current and upcoming movies
2. **Select Show**: Choose your preferred movie, date, and show time
3. **Pick Seats**: Use the interactive seat map to select your seats
4. **Make Payment**: Complete booking with eSewa or Khalti
5. **Get Tickets**: Download your digital tickets with QR codes

### For Admins

1. **Access Admin Panel**: Navigate to `/admin` (requires admin privileges)
2. **Manage Movies**: Add new movies, update details, and manage showtimes
3. **Monitor Bookings**: View real-time booking statistics and user activity
4. **Configure Settings**: Manage screens, pricing, and system settings

## 🔑 Admin Access

### Default Admin Credentials
- **Email**: `admin@bookyourseat.com`
- **Default OTP**: `101010`

### Custom Admin Email Setup
To receive admin OTPs in your own email inbox, add your email to the environment variables:

```env
NEXT_PUBLIC_MY_EMAIL="your-email@example.com"
```

When this environment variable is set, admin OTPs will be sent to your specified email address instead of using the default OTP (101010).

**Note**: Make sure your EmailJS configuration is properly set up to receive emails at your specified address.

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run type-check      # TypeScript type checking

# Database
npm run prisma:studio   # Open Prisma Studio
npm run prisma:migrate  # Create new migration
npm run prisma:push     # Push schema changes
npm run prisma:seed     # Seed database
npm run prisma:reset-dev # Reset development database

```

## 🌐 API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - OTP verification

### Movie Endpoints
- `GET /api/movies` - Get all movies
- `GET /api/movies/[id]` - Get movie by ID
- `POST /api/movies` - Create new movie (Admin)
- `PUT /api/movies/[id]` - Update movie (Admin)

### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/[userId]` - Get user bookings
- `PUT /api/bookings/[id]` - Update booking status

### Payment Endpoints
- `POST /api/payment/esewa` - Process eSewa payment
- `POST /api/payment/khalti` - Process Khalti payment
- `GET /api/payment/verify` - Verify payment status

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all environment variables in Vercel dashboard
3. **Database**: Set up PostgreSQL database (recommended: Neon, Supabase, or Railway)
4. **Deploy**: Vercel will automatically deploy on every push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'feat: add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Aayush](https://github.com/Aayush0966)
- **UI/UX Designer**: [Aayush](https://github.com/Aayush0966)
- **Backend Developer**: [Aayush](https://github.com/Aayush0966)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://www.prisma.io/) for the excellent database toolkit
- [Supabase](https://supabase.com/) for managed PostgreSQL database hosting
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [shadcn/ui](https://ui.shadcn.com/) for beautiful and customizable React components
- [Vercel](https://vercel.com/) for seamless deployment
- [TMDB](https://www.themoviedb.org/) for movie data API
- [eSewa](https://esewa.com.np/) for payment gateway integration
- [Khalti](https://khalti.com/) for payment gateway integration

---

<div align="center">
  <p>Made with ❤️ by Aayush</p>
  <p>
    <a href="https://github.com/Aayush0966/book-your-seat">⭐ Star us on GitHub</a> •
    <a href="https://bookyourseat.vercel.app">🌐 Visit Website</a>
  </p>
</div> 