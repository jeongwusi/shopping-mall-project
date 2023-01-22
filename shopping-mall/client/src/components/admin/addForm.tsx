import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { ADD_PRODUCT, Product, Products } from "../../graphql/products";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import arrToObj from "../../util/arrToObj";

type OmittedProduct = Omit<Product, "id" | "createdAt">;

const AddForm = () => {
  const queryClient = getClient();

  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmittedProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: ({ addProduct }) => {
        // 데이터를 stale처리해서 재요청하게끔 함. =>
        // 장점: 코드가 간단하다. 쉽다
        // 단점: 서버 요청을 또 한다.
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        })

        // 응답결과만으로 캐시 업데이트 => 장단점 반대.
        // const adminData = queryClient.getQueriesData<{
        //   pageParams: (number | undefined)[];
        //   pages: Products[];
        // }>([QueryKeys.PRODUCTS, true]);

        // const [adminKey, { pageParams: adminParams, pages: adminPages }] =
        //   adminData[0];
        // const newAdminPages = [...adminPages];
        // newAdminPages[0].products = [addProduct, ...newAdminPages[0].products];
        // queryClient.setQueriesData(adminKey, {
        //   pageParms: adminParams,
        //   pages: newAdminPages,
        // });

        // const productsData = queryClient.getQueriesData<{
        //   pageParams: (number | undefined)[];
        //   pages: Product[];
        // }>([QueryKeys.PRODUCTS, false]);

        // const [
        //   productsKey,
        //   { pageParams: productsParams, pages: productsPages },
        // ] = productsData[0];
        // const newProductsPages = [...productsPages];
        // newProductsPages[0].products = [
        //   addProduct,
        //   ...newProductsPages[0].products,
        // ];
        // queryClient.setQueriesData(productsKey, {
        //   pageParms: productsParams,
        //   pages: newProductsPages,
        // });
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    addProduct(formData as OmittedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품명: <input name="title" type="text" required />
      </label>
      <label>
        이미지URL: <input name="imageUrl" type="text" required />
      </label>
      <label>
        상품가격: <input name="price" type="number" required min="1000" />
      </label>
      <label>
        상세: <textarea name="description" />
      </label>
      <button type="submit">등록</button>
    </form>
  );
};

export default AddForm;
