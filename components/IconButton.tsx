import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

import type { ButtonProps } from "./Button";

type IconButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  icon: ReactNode;
  className?: string;
};

const IconButton = ({ icon, className = "", ...props }: IconButtonProps) => {
  return (
    <div
      {...props}
      className={`hover:bg-accent-hover-icon rounded ${className}`}
    >
      {icon}
    </div>
  );
};

export default IconButton;
