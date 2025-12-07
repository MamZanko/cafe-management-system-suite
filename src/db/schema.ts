import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Users table - for authentication and role management
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(), // 'admin', 'cashier', 'garson'
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Categories table - bilingual support for menu organization
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameEn: text('name_en').notNull(),
  nameKu: text('name_ku').notNull(),
  descriptionEn: text('description_en'),
  descriptionKu: text('description_ku'),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
});

// Menu items table - products with bilingual names
export const menuItems = sqliteTable('menu_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  nameEn: text('name_en').notNull(),
  nameKu: text('name_ku').notNull(),
  descriptionEn: text('description_en'),
  descriptionKu: text('description_ku'),
  price: real('price').notNull(),
  imageUrl: text('image_url'),
  isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(true),
  preparationTime: integer('preparation_time').notNull(), // in minutes
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Tables table - physical cafe tables with QR codes
export const tables = sqliteTable('tables', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tableNumber: integer('table_number').notNull().unique(),
  qrCode: text('qr_code').notNull().unique(),
  capacity: integer('capacity').notNull(),
  status: text('status').notNull().default('available'), // 'available', 'occupied', 'reserved'
  currentOrderId: integer('current_order_id'),
});

// Orders table - customer orders with status tracking
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tableId: integer('table_id').notNull().references(() => tables.id),
  garsonId: integer('garson_id').references(() => users.id),
  status: text('status').notNull().default('pending'), // 'pending', 'preparing', 'ready', 'served', 'paid', 'cancelled'
  totalAmount: real('total_amount').notNull().default(0),
  discountAmount: real('discount_amount').notNull().default(0),
  finalAmount: real('final_amount').notNull().default(0),
  paymentMethod: text('payment_method'), // 'cash', 'card', 'mixed'
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  completedAt: text('completed_at'),
});

// Order items table - individual items in orders
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').notNull().references(() => orders.id),
  menuItemId: integer('menu_item_id').notNull().references(() => menuItems.id),
  quantity: integer('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  subtotal: real('subtotal').notNull(),
  notes: text('notes'),
  status: text('status').notNull().default('pending'), // 'pending', 'preparing', 'ready', 'served'
  createdAt: text('created_at').notNull(),
});

// Payments table - payment processing records
export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').notNull().references(() => orders.id),
  cashierId: integer('cashier_id').notNull().references(() => users.id),
  amountPaid: real('amount_paid').notNull(),
  paymentMethod: text('payment_method').notNull(), // 'cash', 'card', 'mixed'
  cashAmount: real('cash_amount').notNull().default(0),
  cardAmount: real('card_amount').notNull().default(0),
  changeGiven: real('change_given').notNull().default(0),
  paymentDate: text('payment_date').notNull(),
  createdAt: text('created_at').notNull(),
});

// Inventory table - stock management
export const inventory = sqliteTable('inventory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  itemName: text('item_name').notNull(),
  unit: text('unit').notNull(),
  currentStock: real('current_stock').notNull(),
  minimumStock: real('minimum_stock').notNull(),
  lastRestockedAt: text('last_restocked_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Activity logs table - audit trail
export const activityLogs = sqliteTable('activity_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: integer('entity_id'),
  details: text('details', { mode: 'json' }),
  ipAddress: text('ip_address'),
  createdAt: text('created_at').notNull(),
});


// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});