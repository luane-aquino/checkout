import { ReactNode } from "react";
import "./styles.scss";

type ContainerType = {
  children: ReactNode;
};

const Container = ({ children }: ContainerType) => {
  return (
    <div className="container">
      <div className="container__wrapper">{children}</div>
    </div>
  );
};

export default Container;
