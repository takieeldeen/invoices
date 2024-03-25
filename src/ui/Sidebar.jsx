import { FaSun, FaUsers } from "react-icons/fa6";
import { ImPacman } from "react-icons/im";
import { CiLogout } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";

import Button from "./Button";

import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../App";
import { useLogout } from "../features/users/useLogout";
import { NavLink } from "react-router-dom";
import { IoIosStats } from "react-icons/io";

import { useCheckAdmin } from "../features/users/useCheckAdmin";
import { useUser } from "../features/users/useUser";
// import { useAvatar } from "../features/users/useAvatar";

function Sidebar() {
  const [t, i18n] = useTranslation();
  const { toggleCurrentLanguage, toggleCurrentTheme } = useContext(AppContext);
  const { logout, isPending: isLoggingOut } = useLogout();
  const { user, isLoading: isLoadingUser } = useUser();
  const { data, isPending } = useCheckAdmin();

  const img_url = user.user_metadata.img_url;

  return (
    <aside className="top-0 flex h-[10vh] min-h-16 w-full items-center justify-between bg-neutral-300 drop-shadow-md  dark:bg-tertiary md:left-0 md:h-full md:min-h-[35rem] md:w-20 md:flex-col md:rounded-3xl [&:lang(ar)]:flex-row-reverse md:[&:lang(ar)]:flex-col">
      <NavLink to="/invoices">
        <figure className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-br-3xl rounded-tr-3xl bg-purple-700 md:h-20 md:w-20 ">
          <ImPacman className="before-block relative z-20 -rotate-90 text-3xl text-white md:-rotate-90" />
          <figure className="absolute top-7 h-24 w-24 rounded-full bg-purple-500 md:top-9"></figure>
        </figure>
      </NavLink>

      <div className="flex items-center pr-2 md:flex-col md:pb-4">
        {!isPending && data.isAdmin && (
          <>
            <NavLink to="/movements">
              <Button className="bg-transparent px-0 py-0 text-black hover:bg-transparent">
                <GrTransaction className="text-xl text-purple-700 dark:text-neutral-400" />
              </Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button className="bg-transparent px-0 py-0 text-black hover:bg-transparent">
                <IoIosStats className="text-xl text-purple-700 dark:text-neutral-400" />
              </Button>
            </NavLink>
            <NavLink to="/accounts">
              <Button className="bg-transparent px-0 py-0 text-black hover:bg-transparent">
                <FaUsers className="text-xl text-purple-700 dark:text-neutral-400" />
              </Button>
            </NavLink>
          </>
        )}

        <Button onClick={() => toggleCurrentLanguage()}>
          {i18n.language === "ar" ? "EN" : "AR"}
        </Button>

        <Button
          className="bg-transparent px-0 py-0 text-black hover:bg-transparent"
          onClick={() => toggleCurrentTheme()}
        >
          <FaSun className="text-xl text-purple-700 dark:text-neutral-400" />
        </Button>
        <Button
          className="bg-transparent px-0 py-0 text-black hover:bg-transparent"
          onClick={logout}
        >
          <CiLogout className="text-xl text-purple-700 dark:text-neutral-400" />
        </Button>
        <NavLink to={`/accounts/${user.id}`}>
          {!isLoadingUser && (
            <img
              src={img_url}
              alt="Profile Image"
              className="h-10 w-10 rounded-full"
            />
          )}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
