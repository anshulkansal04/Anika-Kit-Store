#!/bin/bash

echo "🚀 Creating admin account for E-Catalogue..."
echo ""

# Register admin
response=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@ecatalogue.com",
    "password": "admin123456"
  }')

# Check if request was successful
if echo "$response" | grep -q "success.*true"; then
  echo "✅ Admin account created successfully!"
  echo ""
  echo "📋 Login credentials:"
  echo "   Email: admin@ecatalogue.com"
  echo "   Password: admin123456"
  echo ""
  echo "🌐 Access admin panel at: http://localhost:5173/admin/login"
else
  echo "❌ Failed to create admin account:"
  echo "$response"
  echo ""
  echo "💡 Make sure:"
  echo "   1. Backend server is running (npm run dev)"
  echo "   2. MongoDB is connected"
  echo "   3. The email doesn't already exist"
fi 