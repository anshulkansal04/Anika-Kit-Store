import ItemCard from './ItemCard';

const ProductCard = ({ product, index = 0 }) => {
  const { name, image, images, tag, categories, slug } = product;
  const label = categories?.[0]?.name || tag;
  const imageUrl = image?.url || images?.[0]?.url;

  return (
    <ItemCard
      to={`/product/${slug}`}
      imageUrl={imageUrl}
      label={label}
      title={name}
      index={index}
    />
  );
};

export default ProductCard;
