import { CartType } from "../store/CartProvider";

// TODO refact any
export const normalizeData = (data: any): CartType => {
  // TODO refact type
  const normalizedProducts = data.products.map((product: any) => {
    return {
      description: product.description,
      imageUrl: product.image_url,
      price: product.price,
      oldPrice: product.price_without_discount,
    };
  });
  const normalizedData = {
    paymentPlan: data.payment_plan,
    products: normalizedProducts,
  };
  return normalizedData;
};
