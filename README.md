# 🍽️ Cafe Management System

A comprehensive, bilingual cafe management system built with Next.js 15, featuring automatic theme switching and role-based access control.

## ✨ Key Features

### 🌍 Bilingual Support
- **English** and **Kurdish (کوردی)** languages
- Full RTL (Right-to-Left) support for Kurdish
- Seamless language switching
- All UI elements translated

### 🎨 Smart Theme System
- **Automatic switching** based on time of day:
  - 🌞 Light theme: 6:00 AM - 6:00 PM
  - 🌙 Dark theme: 6:00 PM - 6:00 AM
- Manual override option
- Smooth transitions
- Persistent user preferences

### 🔐 Role-Based Access Control
- **Admin** - Full system management
- **Cashier** - Payment processing and sales
- **Garson (Waiter)** - Table and order management
- **Customer** - Public menu browsing

### 📱 Core Modules

#### 1. Customer Menu (`/menu`)
- Browse menu items by category
- Search functionality
- Bilingual product names and descriptions
- Real-time availability status
- Preparation time display

#### 2. Garson Dashboard (`/garson`)
- Visual table management
- Real-time table status (available, occupied, reserved)
- Take orders for tables
- Track active orders
- Order status updates

#### 3. Cashier System (`/cashier`)
- Process payments (cash, card, mixed)
- Handle pending payments
- Calculate change automatically
- Apply discounts
- Today's sales tracking

#### 4. Admin Panel (`/admin`)
- System overview dashboard
- Revenue and order statistics
- Quick access to management features
- Low stock monitoring

## 🗄️ Database Schema

Built on **Turso (LibSQL)** with Drizzle ORM:

- **users** - Staff accounts with roles
- **categories** - Bilingual menu categories
- **menu_items** - Products with multilingual data
- **tables** - Physical cafe tables with QR codes
- **orders** - Order tracking with status workflow
- **order_items** - Individual order line items
- **payments** - Payment records and history
- **inventory** - Stock management
- **activity_logs** - Audit trail

## 🚀 Getting Started

### Demo Credentials

**Admin Access:**
```
Email: admin@cafe.com
Password: admin123
```

**Cashier Access:**
```
Email: cashier@cafe.com
Password: cashier123
```

**Garson (Waiter) Access:**
```
Email: garson1@cafe.com
Password: garson123
```

### Quick Navigation

- **Homepage:** `/` - Overview and quick links
- **Customer Menu:** `/menu` - Public menu browsing
- **Garson Login:** `/garson/login`
- **Cashier Login:** `/cashier/login`
- **Admin Login:** `/admin/login`

## 🛠️ Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** Turso (LibSQL)
- **ORM:** Drizzle
- **Auth:** Better Auth
- **UI:** shadcn/ui + Tailwind CSS v4
- **Icons:** Lucide React
- **Notifications:** Sonner

## 📊 Sample Data

The system comes pre-loaded with realistic data:

- 4 user accounts (admin, cashier, 2 garsons)
- 4 menu categories with Kurdish translations
- 15 menu items (Turkish Coffee, Kebab, Baklava, etc.)
- 15 tables with QR codes
- 8 sample orders with various statuses
- 10 inventory items
- Activity logs and payment records

## 🎯 Core Functionality

### Order Workflow
```
Pending → Preparing → Ready → Served → Paid
                        ↓
                   Cancelled
```

### Payment Methods
- **Cash** - With change calculation
- **Card** - Electronic payment
- **Mixed** - Combination of cash and card

### Table Status
- **Available** 🟢 - Ready for customers
- **Occupied** 🔴 - Currently in use
- **Reserved** 🟡 - Reserved for future

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop layouts
- ✅ Touch-friendly interfaces
- ✅ Adaptive navigation

## 🌐 API Endpoints

### Menu & Categories
- `GET /api/menu` - Fetch menu items
- `GET /api/categories` - Fetch categories

### Tables & Orders
- `GET /api/tables` - Fetch all tables
- `GET /api/orders` - Fetch orders (with filters)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order

### Payments
- `POST /api/payments` - Process payment

## 🔒 Security Features

- ✅ Password hashing (bcrypt)
- ✅ Session-based authentication
- ✅ Bearer token management
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ SQL injection prevention

## 🎨 UI Components

Built with **shadcn/ui** for consistency:
- Cards, Dialogs, Badges
- Forms with validation
- Loading skeletons
- Toast notifications
- Dropdowns and selects
- Data tables

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   ├── cashier/          # Cashier pages
│   ├── garson/           # Garson pages
│   ├── menu/             # Public menu
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # UI components
│   ├── language-switcher.tsx
│   └── theme-switcher.tsx
├── db/
│   ├── schema.ts         # Database schema
│   └── seeds/            # Seed data
├── lib/
│   ├── auth.ts           # Auth config
│   ├── auth-client.ts    # Auth client
│   ├── i18n/             # Translations
│   └── theme/            # Theme provider
└── hooks/                # Custom hooks
```

## 🚦 Development Status

### ✅ Completed Features

- Database schema with 9 tables
- Authentication with 3 user roles
- Bilingual UI (English/Kurdish)
- Automatic theme switching
- Customer menu with search
- Garson dashboard
- Cashier payment system
- Admin panel overview
- API endpoints for core operations
- Responsive design
- Sample data seeding

### 🔮 Future Enhancements

These features can be added based on requirements:

- **Menu Management UI** - CRUD operations for menu items
- **Staff Management** - User account administration
- **Inventory UI** - Stock tracking interface
- **Reports & Analytics** - Sales reports and charts
- **Activity Logs UI** - Audit trail viewer
- **QR Code Generation** - Table QR code management
- **Notifications** - Real-time order updates
- **Receipt Printing** - Order/payment receipts

## 🎓 Usage Examples

### Switching Language

Click the language switcher (🌐) in the header and select:
- **English** for English UI
- **کوردی** for Kurdish UI

### Changing Theme

Click the theme switcher (☀️/🌙/⏰) and choose:
- **Light** - Always light theme
- **Dark** - Always dark theme
- **Auto** - Time-based automatic switching

### Taking an Order (Garson)

1. Login as garson
2. View available tables
3. Select a table
4. Click "New Order" or "Take Order"
5. Add items from menu
6. Submit order

### Processing Payment (Cashier)

1. Login as cashier
2. View pending payments
3. Click "Process Payment" on an order
4. Select payment method
5. Enter amount (for cash)
6. Confirm payment

## 📝 Environment Variables

Required variables in `.env`:

```env
TURSO_CONNECTION_URL=your_turso_url
TURSO_AUTH_TOKEN=your_turso_token
BETTER_AUTH_SECRET=your_secret_key
```

## 🤝 Contributing

This is a demonstration project showcasing:
- Modern Next.js patterns
- Bilingual application architecture
- Role-based access control
- Real-time data management
- Responsive design principles

## 📄 License

Built for educational and commercial use.

## 🙏 Acknowledgments

- shadcn/ui for beautiful components
- Better Auth for authentication
- Turso for database hosting
- Lucide for icons
- Vercel for deployment platform

---

**Ready to manage your cafe efficiently!** ☕️

For detailed technical documentation, see [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md)