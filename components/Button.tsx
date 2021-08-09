import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

// wtf are these types?
export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = ButtonProps & {
  icon?: ReactNode;
};

const Button = ({ icon, children, ...props }: Props) => {
  return (
    <button {...props}>
      <span className="flex items-center rounded opacity-80 hover:opacity-100">
        {icon && <span className="mr-1">{icon}</span>}
        <span>{children}</span>
      </span>
    </button>
  );
};

export default Button;
