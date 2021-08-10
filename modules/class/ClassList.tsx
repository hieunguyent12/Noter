import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

import AddIcon from "../../components/icons/AddIcon";
import axios from "../../utils/axios";
import { Class } from "../../types";
import Button from "../../components/Button";
import Input from "../../components/Input";
import DotsIcon from "../../components/icons/DotsIcon";
import Menu from "../../components/Menu";

interface Props {
  classes: Class[];
  isTeacher: boolean;
}

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

const isClient = typeof window !== "undefined";

let portalRoot: HTMLDivElement;

if (isClient) {
  const existingRoot = document.querySelector(".noter-overlay");
  if (!existingRoot) {
    portalRoot = document.createElement("div");
    portalRoot.className = "noter-overlay";
    document.body.appendChild(portalRoot);
  } else {
    portalRoot = existingRoot as HTMLDivElement;
  }
}

const ClassList = ({ classes, isTeacher }: Props) => {
  const [className, setClassName] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // used for overlay portal
  // the purpose of it is to prevent interaction with other elements under the overlay when an element is within the portal
  // TODO accessiblity
  const parentContainerRef = useRef<HTMLDivElement | null>(null);

  if (parentContainerRef.current === null && isClient) {
    parentContainerRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!parentContainerRef.current) return;

    portalRoot.appendChild(parentContainerRef.current);

    return () => {
      if (parentContainerRef.current) {
        parentContainerRef.current.remove();
      }
    };
  }, []);

  const onNewClass = async () => {
    if (!isTeacher || !className || !classSubject) return;

    // TODO if request is successful, return the saved data to client
    try {
      await axios.post("/api/classes", {
        className,
        classSubject,
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <div>
        <p className="font-medium">My classes</p>
        {classes.map((c) => (
          <div
            key={c.class_id}
            className="h-11 relative group flex justify-between items-center p-2 border rounded my-2 hover:bg-accent-hover-list cursor-pointer"
          >
            <p>{c.name}</p>
            <Menu parentContainer={parentContainerRef.current} />
          </div>
        ))}
        {isTeacher && (
          <div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="text-secondary text-sm mt-2"
              icon={<AddIcon />}
            >
              New class
            </Button>
            {/* TODO create a separate component for Modal */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              style={customStyles}
            >
              <div>
                <p className="mb-3">Create class</p>
                {/* TODO Handle errors for inputs */}
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="class_name"
                >
                  Class name
                </label>
                <Input
                  type="text"
                  placeholder="Class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="p-2"
                  id="class_name"
                />
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={classSubject}
                  onChange={(e) => setClassSubject(e.target.value)}
                  className="p-2"
                  id="subject"
                />
                <div className="flex justify-end mt-2">
                  <p
                    className="p-1 mt-2 text-gray-500 rounded cursor-pointer text-opacity-60 mr-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </p>
                  <p
                    onClick={onNewClass}
                    className="p-1 mt-2 text-secondary-light rounded cursor-pointer hover:text-secondary"
                  >
                    Create
                  </p>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassList;
