import "./styles.scss";

type ButtonType = {
  text: string;
  handleClick: () => void;
  isPrimary?: boolean;
};

const Button = ({ text, isPrimary = true, handleClick }: ButtonType) => {
  return (
    <button
      onClick={handleClick}
      className={`button ${isPrimary ? "primary" : "secondary"}`}
    >
      {text}
    </button>
  );
};

export default Button;
