import { useForm, Controller } from "react-hook-form";
import Card from "../../components/atoms/Card";
import Tabs, { TabContentItemEnum } from "../../components/molecules/Tabs";
import "./styles.scss";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import {
  PaymentContextType,
  PaymentType,
  usePayment,
} from "../../store/PaymentDetailsProvider";

const Payment = () => {
  const {
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

  const isObjectEmpty = (obj: Object) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div className="Payment">
      <Tabs path={TabContentItemEnum.payment} />
      <form
        onSubmit={handleSubmit((data) => {
          setPaymentValue(data);
          navigate("/confirmation");
        })}
        className="Payment__form-wrapper"
      >
        <Card>
          <h1 className="Payment__form-title">Cartão de crédito</h1>
          <div className="input-wrapper input-wrapper--fullwidth">
            <label className="input-wrapper__label" htmlFor="cardNumberInput">
              Número
            </label>
            <Controller
              name="cardNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  id="cardNumberInput"
                  className={errors.cardNumber && "input-wrapper__has-error"}
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
              <p className="input-wrapper__error-message">
                insira um número de cartão válido
              </p>
            )}
          </div>
          <div className="input-wrapper input-wrapper--fullwidth">
            <label
              className="input-wrapper__label"
              htmlFor="cardHolderNameInput"
            >
              Nome do titular do cartão
            </label>
            <Controller
              name="cardHolderName"
              control={control}
              rules={{ required: true, maxLength: 100 }}
              render={({ field }) => (
                <input
                  {...field}
                  id="cardHolderNameInput"
                  className={
                    errors.cardHolderName && "input-wrapper__has-error"
                  }
                  placeholder="Nome impresso no cartão"
                />
              )}
            />
            {errors.cardHolderName && (
              <p className="input-wrapper__error-message">
                insira um nome válido
              </p>
            )}
          </div>
          <div className="input-wrapper__fields-wrapper">
            <div className="input-wrapper">
              <label
                className="input-wrapper__label"
                htmlFor="cardValidUntilInput"
              >
                Data de validade
              </label>
              <Controller
                name="cardValidUntil"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="cardValidUntilInput"
                    className={
                      errors.cardValidUntil && "input-wrapper__has-error"
                    }
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
                <p className="input-wrapper__error-message">
                  insira uma data válida
                </p>
              )}
            </div>

            <div className="input-wrapper">
              <label className="input-wrapper__label" htmlFor="cvvInput">
                Código CVV:
              </label>
              <Controller
                name="cvv"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "insira um cvv válido",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="cvvInput"
                    type="number"
                    className={errors.cvv && "input-wrapper__has-error"}
                    placeholder="000"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 3) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />
              {errors.cvv && (
                <p className="input-wrapper__error-message">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>
        </Card>
        <Container>
          <PaymentPlan />
          <Button
            type="submit"
            text="Finalizar pedido"
            disabled={!isObjectEmpty(errors)}
          />
        </Container>
      </form>
    </div>
  );
};

export default Payment;
