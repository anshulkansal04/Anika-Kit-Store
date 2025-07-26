import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/category/:categoryId" element={<CategoryProducts />} />
            <Route path="/product/:productSlug" element={<ProductDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/:section" element={<AdminDashboard />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="/products/tag/:tagName" element={<CategoryProducts />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;