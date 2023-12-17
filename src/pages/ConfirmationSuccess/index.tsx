import React from "react";
import { TabContentItemEnum } from "../../common/types";
import Tabs from "../../components/molecules/Tabs";
import { usePayment } from "../../store/PaymentDetailsProvider";

const ConfirmationSuccess = () => {
  const { payment } = usePayment();

  console.log("***[value]", payment);
  return (
    <>
      <Tabs path={TabContentItemEnum.success} />
      <h1>ConfirmationSuccess!</h1>
    </>
  );
};

export default ConfirmationSuccess;
