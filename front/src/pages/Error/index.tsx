import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../../components/atoms/Button";

const Error = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="Error">
      <div className="wrapper">
        <div className="content">
          <img
            aria-hidden
            className="content__image"
            src="/images/embarrassed.png"
            alt="embarrassed emoji"
          />
          <p className="content__text">{location?.state?.errorMessage}</p>
        </div>
        <Button
          text="Voltar ao inicio do protótipo"
          styleSecondary
          handleClick={goToHomepage}
        />
      </div>
    </div>
  );
};

export default Error;
