import React from "react";
import "./styles.scss";
import Tabs from "../../components/molecules/Tabs";
import { TabContentItemEnum } from "../../common/types";
import Button from "../../components/atoms/Button";

function Bag() {
  const handleClick = () => {
    // chama a rota payment
    console.log("***[clicked!]");
  };

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      <h1>bag!</h1>
      {/* produtos */}
      {/* prices */}
      <button onClick={handleClick}></button>
      <Button text="Seguir para o pagamento" handleClick={handleClick} />
    </div>
  );
}

export default Bag;
