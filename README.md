# 🪴 The Vintage Drop — E-Commerce Platform

> **Antiques | Plants | Much More**
> 
> *A luxury e-commerce platform dedicated to unique vintage & antique-inspired décor, indoor plants, succulents, and beautifully curated artisan planters.*

---

## 🌟 About The Vintage Drop

**The Vintage Drop** combines classic vintage aesthetics with modern botanical living. Our collection features one-of-a-kind antique-style ceramic pots, hand-painted porcelain vases, rare indoor houseplants, succulents, and decorative home accents that bring character, warmth, and life to any space.

---

## ✨ Features

### 🛍️ Customer Experience
- **Luxury Aesthetic**: Obsidian black (`#0B0B0C`), Antique Gold (`#D4AF37`), and Botanical Emerald (`#1B3B2B`) color palette with elegant typography (*Cormorant Garamond*, *Montserrat*, *Pinyon Script*).
- **Curated Categorization**:
  - 🌿 Indoor Plants
  - 🏺 Vintage Planters & Pots
  - 🌵 Succulents & Cacti
  - 🎨 Antique Décor
  - 🎁 Curated Bundles (Plant + Pot)
  - 🌸 Wall Vases & Hangings
- **Interactive Filtering**: Filter by Style (*Victorian, Art Deco, Rustic, Bohemian, Mid-Century*), Material (*Ceramic, Porcelain, Terracotta, Brass*), Plant Traits, and Sizes.
- **Responsive Shopping Cart**: Dynamic slide-over drawer cart with guest cart merging.
- **Payment Options**: Cash on Delivery (COD) and Online Payment via PayFast gateway in PKR (Rs.).
- **User Authentication**: Secure JWT registration, login, OTP verification, and password reset.

### 🛡️ Admin Dashboard
- **Analytics Overview**: Real-time sales revenue, total orders, and product count tracking.
- **Product Management**: Full CRUD interface with Cloudinary image upload, stock management, SKU assignment, and category tagging.
- **Order Management**: Update order statuses (*Processing, Shipped, Delivered, Cancelled*).
- **User Management**: View and manage customer accounts.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Redux Toolkit, Tailwind CSS, React Router v7, Sonner, React Icons |
| **Backend** | Node.js, Express.js, MongoDB Atlas, Mongoose, JWT Authentication, Nodemailer |
| **Media & Storage** | Cloudinary API (Image Storage) |
| **Payment Gateway** | PayFast Integration |
| **Deployment** | Vercel (Frontend & Serverless Backend) |

---

## 📁 Project Structure

```
Vintage-Drop/
├── backend/
│   ├── config/          # DB & PayFast configuration
│   ├── data/            # Seed data (18 vintage products)
│   ├── middleware/      # Auth & Admin JWT middlewares
│   ├── models/          # Mongoose Schemas (User, Product, Order, Cart, Checkout)
│   ├── routes/          # API Route Handlers
│   ├── utils/           # Payment & Checkout helper functions
│   ├── seeder.js        # Database seeder script
│   ├── server.js        # Express application entry point
│   └── vercel.json      # Serverless deployment configuration
├── frontend/
│   ├── public/          # Favicon and static assets
│   ├── src/
│   │   ├── assets/      # Brand logo and photography
│   │   ├── components/  # Layout, Common, Product, Cart, Admin components
│   │   ├── Pages/       # View pages (Home, Collection, Login, Register, Support)
│   │   ├── redux/       # Redux Toolkit store & slices
│   │   ├── App.jsx      # Main Application routes
│   │   └── index.css    # Tailwind & custom CSS utility styles
│   ├── tailwind.config.js # Brand color tokens & typography definitions
│   ├── vite.config.js   # Vite bundler configuration
│   └── vercel.json      # SPA routing configuration
├── details.txt          # Brand summary
└── README.md            # Project documentation
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=9200
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/VintageDrop?appName=Cluster0
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_SECURED_KEY=your_secured_key
PAYFAST_STORE_ID=your_store_id
PAYFAST_RETURN_URL=https://your-backend.vercel.app/api/payfast/callback
PAYFAST_CHECKOUT_URL=https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction
```

### Frontend (`frontend/.env`)
```env
VITE_BACKEND_URL=https://your-backend.vercel.app
```

---

## 🚀 Local Quickstart

### 1. Clone & Install Dependencies
```bash
# Backend Setup
cd backend
npm install

# Frontend Setup
cd ../frontend
npm install
```

### 2. Seed Database
```bash
cd backend
npm run seed
```

### 3. Run Development Servers
```bash
# Start Backend (Port 9200)
cd backend
npm run dev

# Start Frontend (Port 5173)
cd frontend
npm run dev
```

---

## ☁️ Deployment on Vercel

1. **Deploy Backend**:
   - Import `backend` folder into Vercel.
   - Set environment variables listed in `backend/.env`.
   - Deploy.

2. **Deploy Frontend**:
   - Import `frontend` folder into Vercel.
   - Set `VITE_BACKEND_URL` to your deployed backend URL.
   - Deploy.

---

## 📜 License

© 2026 **The Vintage Drop**. All Rights Reserved.
