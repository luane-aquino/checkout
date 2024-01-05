import { ReactNode } from "react";
import "./styles.scss";

type CardType = {
  children: ReactNode;
};

const Card = ({ children }: CardType) => {
  return <div className="card">{children}</div>;
};

export default Card;
