# E-Catalogue - Product Management System

A full-stack e-commerce catalogue application built with React.js, Node.js, Express, MongoDB, and Cloudinary for image management.

## 🚀 Features

### User Side (Homepage)
- **Product Search**: Search for products by name, description, or category
- **Product Grid**: Responsive grid layout displaying product cards
- **Category Navigation**: Click on product cards to view all products in the same category
- **Modern UI**: Clean, responsive design with Tailwind CSS

### Admin Panel
- **Secure Authentication**: JWT-based admin login system
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Image Upload**: Cloudinary integration for product images
- **Search & Filter**: Search products by name and filter by category
- **Dashboard Overview**: Statistics and product management interface
- **Category Management**: Organize products by tags/categories

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: Cloudinary
- **Icons**: Heroicons

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account for image storage

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/ecatalogue
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔐 Admin Setup

To create an admin account, you can use the registration endpoint or create one directly in MongoDB:

### Using API (First Admin)
Send a POST request to `http://localhost:5000/api/auth/register`:
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

### Using MongoDB directly
```javascript
use ecatalogue
db.admins.insertOne({
  name: "Admin Name",
  email: "admin@example.com",
  password: "$2b$12$hashed_password_here", // Use bcrypt to hash
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/auth/profile` - Get admin profile
- `POST /api/auth/logout` - Logout

### Product Routes
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `GET /api/products/tag/:tagName` - Get products by tag (public)
- `GET /api/products/tags/all` - Get all unique tags (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/admin/all` - Get admin products with search/filter (admin only)

## 📱 Usage

### For Users
1. Visit the homepage to browse products
2. Use the search bar to find specific products
3. Click on product cards to view all products in that category
4. Browse products by categories

### For Admins
1. Go to `/admin/login` to access the admin panel
2. Login with admin credentials
3. Navigate to the dashboard to:
   - View product statistics
   - Add new products with images
   - Edit existing products
   - Delete products
   - Search and filter products

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean interface with smooth animations
- **Image Optimization**: Cloudinary integration for optimized images
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side and server-side validation

## 🔒 Security Features

- JWT-based authentication for admin routes
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Secure file upload handling
- Protected admin routes

## 📂 Project Structure

```
e-catalogue/
├── backend/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── products.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loading.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Homepage.jsx
│   │   │   └── ProductsByTag.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── README.md
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Set up Cloudinary credentials
4. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Update `VITE_API_BASE_URL` to your production backend URL
2. Build the project: `npm run build`
3. Deploy to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or need support, please create an issue in the repository with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## ✨ Future Enhancements

- User authentication and user accounts
- Shopping cart functionality
- Order management system
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Analytics dashboard 