import { OrderType, Product } from "models/order";
import { CartType } from "store/CartProvider";

export const normalizeData = (data: OrderType): CartType => {
  const normalizedProducts = data.products.map((product: Product) => {
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
