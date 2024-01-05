import "./styles.scss";

type ProductTitleType = {
  title: string;
};

const ProductTitle = ({ title }: ProductTitleType) => {
  return <p className="ProductTitle">{title}</p>;
};

export default ProductTitle;
