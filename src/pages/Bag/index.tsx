import React from "react";
import "./Bag.css";
import Tabs from "../../components/molecules/Tabs";
import { TabContentItemEnum } from "../../common/types";

function Bag() {
  const handleClick = () => {
    // chama a rota payment
  };

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      <h1>bag!</h1>
      {/* produtos */}
      {/* prices */}
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Bag;
