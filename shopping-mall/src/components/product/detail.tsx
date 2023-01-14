import { Product } from "../../types";

const ProductDetail = ({
  item: {
    category,
    title,
    image,
    description,
    price,
    rating: { rate },
  },
}: {
  item: Product;
}) => (
  <div className="product-deteail">
    <p className="product-deteail__category">{category}</p>
    <p className="product-deteail__title">{title}</p>
    <img className="product-deteail__image" src={image} />
    <p className="product-deteail__description">{description}</p>
    <span className="product-deteail__price">${price}</span>
    <span className="product-deteail__rating">{rate}</span>
  </div>
);

export default ProductDetail;
