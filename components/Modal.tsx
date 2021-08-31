import ReactModal from "react-modal";

type Props = {
  header: string;
  body: JSX.Element;
  footer: JSX.Element;
  isOpen: boolean;
  onRequestClose: () => void;
};

const customStyles = {
  content: {
    height: "272px",
    width: "300px",
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -40%)",
    border: "none",
    padding: "17px 17px 0px 17px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};

const Modal = ({ header, body, footer, isOpen, onRequestClose }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div>
        <p className="mb-3">{header}</p>
        {body}
        {footer}
      </div>
    </ReactModal>
  );
};

export default Modal;
