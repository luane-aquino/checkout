import "./styles.scss";

type ProductDescriptionType = {
  imageUrl: string;
  description: string;
};

const ProductDescription = ({
  imageUrl,
  description,
}: ProductDescriptionType) => {
  return (
    <li className="ProductDescription__list-item">
      <img src={imageUrl} alt="" width="60px" height="60px" className="image" />
      <p className="desc">{description}</p>
    </li>
  );
};

export default ProductDescription;
