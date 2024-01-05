import "./styles.scss";

type ProductInfoType = {
  imageUrl: string;
  description: string;
};

const ProductInfo = ({ imageUrl, description }: ProductInfoType) => {
  return (
    <li className="ProductInfo__list-item">
      <img src={imageUrl} alt="" className="ProductInfo__image" />
      <p className="desc">{description}</p>
    </li>
  );
};

export default ProductInfo;
