import "./styles.scss";

type ButtonType = {
  text: string;
  handleClick?: () => void;
  isPrimary?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
};

const Button = ({
  text,
  isPrimary = true,
  handleClick,
  type = "button",
  isDisabled = false,
}: ButtonType) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${isPrimary ? "primary" : "secondary"}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
