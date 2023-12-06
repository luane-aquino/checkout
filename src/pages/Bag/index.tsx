import React from "react";
import "./styles.scss";
import Tabs from "../../components/molecules/Tabs";
import { TabContentItemEnum } from "../../common/types";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";

function Bag() {
  const navigate = useNavigate();
  const handleClick = () => {
    // chama a rota payment
    console.log("***[clicked!]");
    navigate("/payment");
  };

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      <h1>bag!</h1>
      {/* produtos */}
      {/* prices */}
      <Button text="Seguir para o pagamento" handleClick={handleClick} />
    </div>
  );
}

export default Bag;
