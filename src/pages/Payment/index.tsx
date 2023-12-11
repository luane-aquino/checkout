import { useForm } from "react-hook-form";
import { TabContentItemEnum } from "../../common/types";
import Card from "../../components/atoms/Card";
import Tabs from "../../components/molecules/Tabs";
import "./styles.scss";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import { data } from "../../mock/data";
import Button from "../../components/atoms/Button";

const Payment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      cardValidUntil: "",
      cvv: "",
    },
  });
  return (
    <>
      <Tabs path={TabContentItemEnum.payment} />
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
        className="wrapper"
      >
        <Card>
          <h1>Cartão de crédito</h1>
          <label>Número</label>
          <input {...register("cardNumber")} />
          <label>Nome do titular do cartão</label>
          <input
            {...register("cardHolderName", { required: true, maxLength: 10 })}
          />
          <label>Data de validade</label>
          <input
            {...register("cardValidUntil", { required: true, maxLength: 10 })}
          />
          <label>Código CVV:</label>
          <input {...register("cvv", { required: true, maxLength: 10 })} />
          {/* <input type="submit" /> */}
        </Card>
        {/* prices */}
        <Container>
          <PaymentPlan
            quantity={data.products.length}
            total={data.paymentPlan.total}
            shipping={data.paymentPlan.shipping}
            discount={data.paymentPlan.discount}
            subtotal={data.paymentPlan.subtotal}
          />
          <Button type="submit" text="Seguir para o pagamento" />
        </Container>
      </form>
    </>
  );
};

export default Payment;
