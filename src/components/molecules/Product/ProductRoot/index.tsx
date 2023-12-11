import { ReactNode } from "react";
import "./styles.scss";

type ProductRootType = {
  children: ReactNode;
};

const ProductRoot = ({ children }: ProductRootType) => {
  return <ul className="ProductRoot">{children}</ul>;
};

export default ProductRoot;
