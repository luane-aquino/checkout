import "./styles.scss";

type ButtonType = {
  text: string;
  handleClick?: () => void;
  isPrimary?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({
  text,
  isPrimary = true,
  handleClick,
  type = "button",
}: ButtonType) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${isPrimary ? "primary" : "secondary"}`}
    >
      {text}
    </button>
  );
};

export default Button;
