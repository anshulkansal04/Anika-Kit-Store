import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, name, image, price, tag } = product;

  return (
    <Link
      to={`/products/tag/${tag}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={image.url}
          alt={name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {tag}
          </span>
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          Click to view all {tag} products
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 