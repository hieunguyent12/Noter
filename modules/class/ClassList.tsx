import { useState } from "react";
import Modal from "react-modal";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

import AddIcon from "../../components/icons/AddIcon";
import axios from "../../utils/axios";
import { Class } from "../../types";
import Button from "../../components/Button";
import Input from "../../components/Input";
import DotsIcon from "../../components/icons/DotsIcon";

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

const ClassList = ({ classes, isTeacher }: Props) => {
  const [className, setClassName] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <p className="font-medium">My classes</p>
      {classes.map((c) => (
        <div
          key={c.class_id}
          className="h-11 group flex justify-between items-center p-2 border rounded my-2 hover:bg-accent-hover-list cursor-pointer"
        >
          <p>{c.name}</p>
          {/* BUG if a menu is currently showing, we have to click outside to make it disappear
            the current behavior makes it so that when the mouse hovers another element, the menu disappears
          */}
          <span className="hidden group-hover:block p-1 hover:bg-accent-hover-icon rounded">
            <Menu
              menuButton={
                <MenuButton onClick={() => console.log("hi")}>
                  <DotsIcon />
                </MenuButton>
              }
              className="z-50"
            >
              <MenuItem>Test</MenuItem>
            </Menu>
          </span>
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
  );
};

export default ClassList;
