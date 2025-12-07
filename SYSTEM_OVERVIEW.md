# Cafe Management System - Complete Overview

## 🎯 System Features

A comprehensive cafe management system with **bilingual support (English/Kurdish)** and **automatic day/night theme switching**.

## 🏗️ Architecture

### Database Schema (Turso/LibSQL)
- **users** - Authentication and role management (admin, cashier, garson)
- **categories** - Bilingual menu organization
- **menu_items** - Products with bilingual names/descriptions
- **tables** - Physical cafe tables with QR codes
- **orders** - Order management with status tracking
- **order_items** - Individual items in orders
- **payments** - Payment processing records
- **inventory** - Stock management
- **activity_logs** - Comprehensive audit trail

### Authentication System (Better Auth)
- Email/password authentication
- Role-based access control (admin, cashier, garson)
- Session management with bearer tokens
- Protected routes for each user role

### Internationalization (i18n)
- **English** and **Kurdish** language support
- RTL (Right-to-Left) support for Kurdish
- Context-based translation system
- localStorage persistence

### Theme System
- **Automatic switching**: Light theme (6am-6pm), Dark theme (6pm-6am)
- Manual override option
- Smooth transitions
- Persistent preferences

## 📱 Main Components

### 1. Customer Menu (`/menu`)
- **Public access** - No authentication required
- Browse menu with categories
- Search functionality
- Bilingual display (English/Kurdish)
- Item details with prices and preparation time
- Responsive grid layout

### 2. Garson (Waiter) Dashboard (`/garson`)
- **Login required** - garson role
- View all tables with status indicators
- Active orders management
- Take new orders
- Update order status
- Real-time table availability
- Demo credentials: `garson1@cafe.com` / `garson123`

### 3. Cashier System (`/cashier`)
- **Login required** - cashier role
- Process payments (cash, card, mixed)
- Pending payments view
- Today's sales statistics
- Payment history
- Change calculation for cash payments
- Demo credentials: `cashier@cafe.com` / `cashier123`

### 4. Admin Panel (`/admin`)
- **Login required** - admin role
- System-wide dashboard with statistics
- Quick access to all management features:
  - Menu Management
  - Staff Management
  - Inventory Management
  - Reports & Analytics
  - System Settings
- Demo credentials: `admin@cafe.com` / `admin123`

## 🔌 API Endpoints

### Menu & Categories
- `GET /api/menu` - Get all menu items (with optional categoryId filter)
- `GET /api/categories` - Get all active categories

### Tables
- `GET /api/tables` - Get all tables with status

### Orders
- `GET /api/orders` - Get orders (with optional status/garsonId filters)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details with items
- `PATCH /api/orders/[id]` - Update order

### Payments
- `POST /api/payments` - Process payment and update order status

## 🎨 UI Components

All components are built with **shadcn/ui** and fully responsive:
- Navigation with language/theme switchers
- Cards for data display
- Dialogs for forms
- Badges for status indicators
- Skeletons for loading states
- Toast notifications for user feedback

## 🌍 Language Support

### English UI
- Clean, modern interface
- LTR (Left-to-Right) layout
- Professional terminology

### Kurdish UI (کوردی)
- Complete translation coverage
- RTL (Right-to-Left) layout
- Kurdish typography support
- Cultural adaptations

## 🎨 Theme System

### Auto Theme (Default)
- **6:00 AM - 6:00 PM**: Light theme
- **6:00 PM - 6:00 AM**: Dark theme
- Updates automatically every minute

### Manual Override
- Light theme option
- Dark theme option
- Preference saved to localStorage

## 👥 User Roles

### Admin
- Full system access
- Menu and category management
- Staff account management
- Reports and analytics
- System settings

### Cashier
- Process payments
- View pending payments
- Access order history
- Generate cashier reports

### Garson (Waiter)
- Manage assigned tables
- Take orders
- Update order status
- View active orders

## 📊 Sample Data

The system includes realistic seed data:
- 4 users (1 admin, 1 cashier, 2 garsons)
- 4 menu categories (Beverages, Main Dishes, Desserts, Appetizers)
- 15 menu items with Kurdish names
- 15 tables with QR codes
- 8 sample orders with various statuses
- 10 inventory items
- Activity logs

## 🚀 Getting Started

### Demo Credentials

**Admin:**
- Email: `admin@cafe.com`
- Password: `admin123`

**Cashier:**
- Email: `cashier@cafe.com`
- Password: `cashier123`

**Garson:**
- Email: `garson1@cafe.com`
- Password: `garson123`

### Navigation

1. **Homepage** (`/`) - Overview with quick access to all sections
2. **Customer Menu** (`/menu`) - Public menu browsing
3. **Garson Login** (`/garson/login`) - Waiter authentication
4. **Cashier Login** (`/cashier/login`) - Cashier authentication
5. **Admin Login** (`/admin/login`) - Admin authentication

## 🔧 Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Turso (LibSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── categories/     # Category endpoints
│   │   ├── menu/           # Menu endpoints
│   │   ├── orders/         # Order endpoints
│   │   ├── payments/       # Payment endpoints
│   │   └── tables/         # Table endpoints
│   ├── admin/              # Admin pages
│   ├── cashier/            # Cashier pages
│   ├── garson/             # Garson pages
│   ├── menu/               # Customer menu
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── language-switcher.tsx
│   └── theme-switcher.tsx
├── db/
│   ├── schema.ts           # Database schema
│   ├── seeds/              # Seed data files
│   └── index.ts            # Database client
├── lib/
│   ├── auth.ts             # Auth configuration
│   ├── auth-client.ts      # Auth client utilities
│   ├── i18n/
│   │   ├── translations.ts # All translations
│   │   └── i18n-context.tsx # i18n provider
│   └── theme/
│       └── theme-provider.tsx # Theme provider
└── hooks/                  # Custom React hooks
```

## 🎯 Key Features Completed

✅ Database schema with 9 comprehensive tables
✅ Authentication with role-based access control
✅ Bilingual support (English/Kurdish) with RTL
✅ Automatic day/night theme switching
✅ Customer menu with search and filters
✅ Garson dashboard with table management
✅ Cashier system with payment processing
✅ Admin panel with system overview
✅ Responsive design for all screen sizes
✅ Real-time data fetching
✅ Loading states and error handling
✅ Toast notifications
✅ Sample seed data for testing

## 📝 Future Enhancements

The following features can be added:
- **Admin Panel Extensions**:
  - Menu item CRUD with image uploads
  - Staff account management
  - Category management
  - System settings

- **Inventory Management**:
  - Stock tracking
  - Low stock alerts
  - Restock management

- **Reports & Analytics**:
  - Daily/Weekly/Monthly sales reports
  - Staff performance metrics
  - Top-selling items
  - Category-wise sales

- **Activity Logs**:
  - Comprehensive audit trail
  - User action tracking
  - System event logging

- **Table Configuration**:
  - QR code generation
  - Table layout management
  - Capacity configuration

- **Notifications Center**:
  - Real-time notifications
  - Order status updates
  - Low stock alerts

## 🔒 Security

- Password hashing with bcrypt
- Session-based authentication
- Bearer token management
- Protected API routes
- Role-based access control
- SQL injection prevention (Drizzle ORM)

## 🌐 Deployment

The system is configured for deployment on Vercel with:
- Turso database (serverless SQLite)
- Environment variables in `.env`
- Production-ready build configuration

## 📱 Responsive Design

All pages are fully responsive:
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly interfaces

## 🎨 Design System

- Consistent color scheme
- Tailwind CSS v4 with custom variables
- Dark/Light mode support
- Smooth transitions
- Accessible components

---

**Built with ❤️ for modern cafe management**
