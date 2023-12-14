import { useForm, Controller } from "react-hook-form";
import { TabContentItemEnum } from "../../common/types";
import Card from "../../components/atoms/Card";
import Tabs from "../../components/molecules/Tabs";
import "./styles.scss";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import { data } from "../../mock/data";
import Button from "../../components/atoms/Button";

type FormType = {
  cardNumber: string;
  cardHolderName: string;
  cardValidUntil: "";
  cvv: "";
};

const Payment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<FormType>({
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      cardValidUntil: "",
      cvv: "",
    },
  });

  const formatCardNumber = (value: any) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: any) => {
    return value
      .replace(/\s/g, "")
      .replace(/^(\d{2})(\d)/g, "$1/$2")
      .trim();
  };

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
          <div className="input-wrapper input-wrapper--fullwidth">
            <label>Número</label>
            <Controller
              name="cardNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  className={errors.cardNumber && "has-error"}
                  placeholder="0000 0000 0000 0000"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9 ]/g, "");
                    if (value.length <= 19) {
                      const formattedValue = formatCardNumber(value);
                      field.onChange(formattedValue);
                    }
                  }}
                />
              )}
            />
            {errors.cardNumber && (
              <p className="error-message">insira um número de cartão válido</p>
            )}
          </div>
          <div className="input-wrapper input-wrapper--fullwidth">
            <label>Nome do titular do cartão</label>
            <input
              placeholder="Nome impresso no cartão"
              className={errors.cardHolderName && "has-error"}
              {...register("cardHolderName", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.cardHolderName && (
              <p className="error-message">insira um nome válido</p>
            )}
          </div>
          <div className="fields-wrapper">
            <div className="input-wrapper">
              <label>Data de validade</label>
              <Controller
                name="cardValidUntil"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={errors.cardValidUntil && "has-error"}
                    placeholder="MM/AAAA"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value.length < 7) {
                        const formattedValue = formatExpiryDate(value);
                        field.onChange(formattedValue);
                      }
                    }}
                  />
                )}
              />
              {errors.cardValidUntil && (
                <p className="error-message">insira uma data válida</p>
              )}
            </div>

            <div className="input-wrapper">
              <label>Código CVV:</label>
              <input {...register("cvv", { required: true })} />
            </div>
          </div>
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
