import "./styles.scss";

type ProductInfoType = {
  imageUrl: string;
  description: string;
};

const ProductInfo = ({ imageUrl, description }: ProductInfoType) => {
  return (
    <li className="ProductInfo__list-item">
      <img src={imageUrl} alt="" width="60px" height="60px" className="image" />
      <p className="desc">{description}</p>
    </li>
  );
};

export default ProductInfo;
