import "./styles.scss";

type ButtonType = {
  text: string;
  handleClick?: () => void;
  styleSecondary?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
};

const Button = ({
  text,
  styleSecondary = false,
  handleClick,
  type = "button",
  disabled = false,
}: ButtonType) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${styleSecondary ? "secondary" : "primary"}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
