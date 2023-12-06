import { TabContentItemEnum } from "../../common/types";
import Tabs from "../../components/molecules/Tabs";

const ConfirmationSuccess = () => {
  return (
    <>
      <Tabs path={TabContentItemEnum.success} />
      <h1>ConfirmationSuccess!</h1>
    </>
  );
};

export default ConfirmationSuccess;
