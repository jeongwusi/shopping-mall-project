import { useInfiniteQuery } from "react-query";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import ProductList from "../../components/product/list";

const ProductListPage = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
    QueryKeys.PRODUCTS,
    ({ pageParam = "" }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage, allPages);
        lastPage.products.at(-1)?.id;
      },
    }
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductListPage;
