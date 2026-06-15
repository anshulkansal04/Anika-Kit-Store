import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Homepage from './pages/Homepage';
const CategoryProducts = lazy(() => import('./pages/CategoryProducts'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Suspense fallback={<div style={{minHeight:'50vh'}} /> }>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/category/:categoryId" element={<CategoryProducts />} />
              <Route path="/product/:productSlug" element={<ProductDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/:section" element={<AdminDashboard />} />
              {/* Legacy routes for backward compatibility */}
              <Route path="/products/tag/:tagName" element={<CategoryProducts />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;