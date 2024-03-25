import { useNavigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { ImPacman } from "react-icons/im";
import { useTranslation } from "react-i18next";

function ProtectedRoute({ children }) {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();
  //Get the data of the current user
  const { isLoading, isAuthenticated, user } = useUser();
  //Check if there is a logged in user
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/");
    },
    [isAuthenticated, isLoading, navigate],
  );
  if (isLoading)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-neutral-200 dark:bg-dark">
        <div className="flex  text-purple-900 dark:text-purple-700">
          <h1 className="text-6xl  font-bold">{t("register.appname")}</h1>
          <ImPacman className=" text-6xl" />
        </div>
        <div className="h-24 w-24">
          <Spinner />
        </div>
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
