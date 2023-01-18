import { Product } from "../../graphql/products";

const ProductDetail = ({ item: { title, imageUrl, description, price },
}: {
  item: Product;
}) => (
  <div className="product-deteail">
    <p className="product-deteail__title">{title}</p>
    <img className="product-deteail__image" src={imageUrl} />
    <p className="product-deteail__description">{description}</p>
    <span className="product-deteail__price">${price}</span>
  </div>
); 

export default ProductDetail;
