import { useForm, Controller } from "react-hook-form";
import {
  PaymentContextType,
  PaymentType,
  TabContentItemEnum,
} from "../../common/types";
import Card from "../../components/atoms/Card";
import Tabs from "../../components/molecules/Tabs";
import "./styles.scss";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import { data } from "../../mock/data";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../store/PaymentDetailsProvider";
import { isObjectEmpty } from "../../utils/objectUtils";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PaymentType>({
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      cardValidUntil: "",
      cvv: "",
    },
  });
  const navigate = useNavigate();
  const { setPaymentValue } = usePayment() as PaymentContextType;

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: string) => {
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
          console.log("***[data]", data);
          setPaymentValue(data);
          navigate("/confirmation");
        })}
        className="wrapper"
      >
        <Card>
          <h1 className="form-title">Cartão de crédito</h1>
          <div className="input-wrapper input-wrapper--fullwidth">
            <label className="label">Número</label>
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
            <label className="label">Nome do titular do cartão</label>
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
              <label className="label">Data de validade</label>
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
              <label className="label">Código CVV:</label>
              <input
                type="number"
                placeholder="000"
                className={errors.cvv && "has-error"}
                {...register("cvv", {
                  required: {
                    value: true,
                    message: "insira um cvv válido",
                  },
                  maxLength: {
                    value: 3,
                    message: "número máximo de caracteres é 3",
                  },
                })}
              />
              {errors.cvv && (
                <p className="error-message">{errors.cvv.message}</p>
              )}
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
          <Button
            type="submit"
            text="Finalizar pedido"
            isDisabled={!isObjectEmpty(errors)}
          />
        </Container>
      </form>
    </>
  );
};

export default Payment;
