import ProductItem from "./item";
import { Product } from "../../graphql/products";

const ProductList = ({ list }: { list: { products: Product[] }[] }) => (
  <ul className="products">
    {list.map((page) =>
      page.products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))
    )}
  </ul>
);

export default ProductList;
