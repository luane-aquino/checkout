import { ReactNode } from "react";
import "./styles.scss";

type ContainerType = {
  children: ReactNode;
};

const Container = ({ children }: ContainerType) => {
  return <div className="container">{children}</div>;
};

export default Container;
