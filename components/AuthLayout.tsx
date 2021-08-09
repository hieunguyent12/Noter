import { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";

import AddIcon from "./icons/AddIcon";
import MenuIcon from "../components/icons/MenuIcon";
import NotificationIcon from "../components/icons/NotificationIcon";
import SearchIcon from "../components/icons/SearchIcon";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import OutsideClickHandler from "../components/OutsideClickHandler";
import { useClass } from "../components/context/ClassContext";
import axios from "../utils/axios";

type AuthLayoutProps = { children: ReactNode };

// Auth layout will be for authenticated users which will include a menu up top
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [session, loading] = useSession();
  const [classes, dispatch] = useClass();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const res = await axios.get("/api/classes");

      // we are saving the data in a Context so other components can reuse it
      dispatch({ type: "LOAD_DATA", payload: res.data.classes || [] });
    }

    if (session) getData();
  }, [dispatch, session]);

  // TODO displays a sidebar on laptops
  // displays the top menu on mobile

  if (!session) {
    return <p>Something went wrong...</p>;
  } else {
    return (
      <>
        <div className="px-2">
          <div className="w-100 flex justify-between mt-2 mb-6 text-accent items-center">
            <IconButton
              icon={<MenuIcon />}
              onClick={() => setShowNavbar(!showNavbar)}
              className="cursor-pointer"
            />
            <Input className="w-64" icon={<SearchIcon />} />
            <div className="flex items-center">
              <IconButton
                icon={<NotificationIcon />}
                className="cursor-pointer"
              />
            </div>
          </div>
          {children}
        </div>
        {/* Move this to a separate component?  */}
        <OutsideClickHandler cb={() => setShowNavbar(false)}>
          <nav
            // className="fixed top-0"
            className={`navbar fixed top-0 transition-left duration-200 bg-accent-sidebar w-52 h-full shadow-md text-textColor-light ${
              showNavbar ? "left-0" : "-left-full"
            }`}
          >
            <ul>
              <li className="flex items-center p-3">
                <span>
                  {session.user?.image && (
                    <Image
                      className="inline object-cover rounded-md"
                      src={session.user?.image}
                      alt="Profile image"
                      width="30px"
                      height="30px"
                    />
                  )}
                </span>
                <span className="ml-2 mb-1">{session.user?.name}</span>
              </li>
              <li className="mt-3 px-3 text-sm mb-1">Classes</li>
              {classes.map((c) => (
                <li
                  key={c.class_id}
                  className="hover:bg-accent-hover-icon cursor-pointer"
                  onClick={() => router.push(`/class/${c.class_id}`)}
                >
                  <p className="py-1 px-3">{c.name}</p>
                </li>
              ))}
              <li className="flex px-2 items-center mt-2 text-sm">
                <span>
                  <AddIcon />
                </span>
                <span className="ml-1">New class</span>
              </li>
            </ul>
          </nav>
        </OutsideClickHandler>
      </>
    );
  }
};

export default AuthLayout;
