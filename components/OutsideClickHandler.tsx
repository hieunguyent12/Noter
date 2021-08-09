import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  cb: () => void;
}

const OutsideClickHandler = ({ children, cb }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClickHandler;
