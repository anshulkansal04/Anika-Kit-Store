import { Link } from 'react-router-dom';
import ImageContainer from './ui/ImageContainer';
import Typography from './ui/Typography';

/**
 * ProductCard — Displays a product in a grid.
 * Uses ImageContainer to enforce consistent image sizes.
 * Implements press feedback and hover lift.
 */
const ProductCard = ({ product }) => {
  const { name, image, tag, slug } = product;

  return (
    <Link to={`/product/${slug}`} className="block h-full outline-none group">
      <div className="card h-full flex flex-col card-hover active:scale-[0.98]">
        
        {/* Image Area */}
        <ImageContainer
          src={image?.url}
          alt={name}
          aspectRatio="square"
          className="rounded-t-[1rem]"
          // Subtle scale on desktop hover
          imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out-quart"
        />
        
        {/* Content Area */}
        <div className="p-4 sm:p-5 flex-grow flex flex-col">
          {/* Category Badge / Overline */}
          {tag && (
            <Typography 
              variant="overline" 
              color="muted" 
              className="mb-2 block line-clamp-1"
            >
              {tag}
            </Typography>
          )}
          
          {/* Product Name */}
          <Typography 
            variant="h3" 
            className="group-hover:text-primary-600 transition-colors duration-200 line-clamp-2"
          >
            {name}
          </Typography>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;