import { TabContentItemEnum } from "../../common/types";
import Tabs from "../../components/molecules/Tabs";

const Payment = () => {
  return (
    <>
      <Tabs path={TabContentItemEnum.payment} />
      <h1>payment!</h1>
    </>
  );
};

export default Payment;
