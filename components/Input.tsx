import { ReactNode, ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  icon?: ReactNode;
};

const Input = ({ icon, className, ...props }: InputProps) => {
  // TODO if we click the icon, the text field should focus
  return (
    <div
      className={`flex bg-accent-input border border-test rounded p-1 items-center focus-within:border-white focus-within:ring-2 focus-within:ring-secondary-light focus-within:bg-white ${className}`}
    >
      {icon && <span style={{ color: "#A1A1AA" }}>{icon}</span>}
      <input
        type="text"
        placeholder="Search"
        className={`focus:outline-none ml-1 w-full h-full`}
        style={{ background: "none" }}
        {...props}
      />
    </div>
  );
};

export default Input;
