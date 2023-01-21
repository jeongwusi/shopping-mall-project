import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { ADD_PRODUCT, Product } from "../../graphql/products";
import { graphqlFetcher } from "../../queryClient";
import arrToObj from "../../util/arrToObj";

type OmittedProduct = Omit<Product, "id" | "createdAt">;

const AddForm = () => {
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmittedProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description })
    // {
    //   onMutate: async ({ id, amount }) => {
    //     await queryClient.cancelQueries(QueryKeys.CART);
    //     const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[]}>(QueryKeys.CART) || { cart: [] }
    //     if (!prevCart) return null

    //     const targetIndex = prevCart.findIndex(cartItem => cartItem.id === id)
    //     if (targetIndex === undefined || targetIndex < 0) return prevCart

    //     const newCart = [...prevCart]
    //     newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount })
    //     queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
    //     return prevCart;
    //   },
    //   onSuccess: ({ updateCart }) => {
    //     // item 하나에 대한 데이터
    //     const { cart: prevCart} = queryClient.getQueryData<{ cart: CartType[]}>(QueryKeys.CART) || { cart: [] }
    //     const targetIndex = prevCart?.findIndex(cartItem => cartItem.id === updateCart.id)

    //     if (!prevCart || targetIndex === undefined || targetIndex < 0) return

    //     const newCart = [...prevCart]
    //     newCart.splice(targetIndex, 1, updateCart)
    //     queryClient.setQueryData(QueryKeys.CART, { cart: newCart }); // Cart 전체에 대한 데이터
    //   },
    // }
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
