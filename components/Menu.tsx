import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import DotsIcon from "./icons/DotsIcon";
import OutsideClickHandler from "./OutsideClickHandler";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";

type MenuProps = {
  parentContainer: HTMLDivElement | null;
};

const Menu = ({ parentContainer }: MenuProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      // modifiers: [{ name: "arrow", options: { element: arrowElement } }],
      placement: "bottom",
    }
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!parentContainer) return;

    if (visible) {
      parentContainer.className = "overlay-item-open";
    } else {
      parentContainer.className = "";
    }
  }, [parentContainer, visible]);

  return (
    <>
      <div
        ref={setReferenceElement}
        onClick={() => setVisible(!visible)}
        className="hidden transition group-hover:inline-block p-1 hover:bg-accent-hover-icon rounded"
      >
        <DotsIcon />
      </div>

      {visible && (
        <MenuPortal
          parentContainer={parentContainer}
          // ref={menuRef}
          setVisible={setVisible}
          setPopperElement={setPopperElement}
          styles={styles}
          attributes={attributes}
        />
      )}
    </>
  );
};

interface Props {
  parentContainer: HTMLDivElement | null;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setPopperElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
  styles: {
    [key: string]: CSSProperties;
  };
  attributes: any;
}
const MenuPortal = (props: Props) => {
  const { setPopperElement, styles, attributes, parentContainer } = props;

  if (!parentContainer) return null;

  return createPortal(
    <OutsideClickHandler cb={() => props.setVisible(false)}>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="bg-white shadow-test w-32 text-sm px-2"
      >
        <p className="flex items-center my-2">
          <span>
            <EditIcon className="h-4 w-4" />
          </span>
          <span className="ml-1">Edit</span>
        </p>
        <p className="flex items-center my-2">
          <span>
            <DeleteIcon className="h-4 w-4" />
          </span>
          <span className="ml-1">Delete</span>
        </p>
      </div>
    </OutsideClickHandler>,
    parentContainer
  );
};

MenuPortal.displayName = "MenuPortal";

export default Menu;
