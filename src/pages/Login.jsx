import { ImPacman } from "react-icons/im";

import Input from "../ui/Input";
import { FaLock, FaUser } from "react-icons/fa6";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { useLogin } from "../features/users/useLogin";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/users/useUser";
import { useNavigate } from "react-router-dom";
import OverlaySpinner from "../ui/OverlaySpinner";

function Login() {
  const [t, i18n] = useTranslation();
  const { isLoading: isLoadingCurrentUser, isAuthenticated } = useUser();
  const navigate = useNavigate();
  //Check if there is a current user
  if (!isLoadingCurrentUser && isAuthenticated) {
    navigate("/invoices");
  }

  const [email, setEmail] = useState("soska@soska.com");
  const [password, setPassword] = useState("123456789");

  const { isPending, login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-neutral-200 dark:bg-dark">
      {(isLoadingCurrentUser || isPending) && <OverlaySpinner />}
      <div className="mb-10 flex gap-2 text-purple-900 dark:text-purple-700">
        <h1 className="text-6xl  font-bold">{t("login.appname")}</h1>
        <ImPacman className=" text-6xl" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-96 flex-col gap-10"
      >
        <h2 className="text-center font-bold uppercase tracking-wide text-purple-900 dark:text-purple-600">
          {t("login.title")}
        </h2>
        <Input
          setFn={setEmail}
          placeholder={t("login.username")}
          type="text"
          name="username"
          icon={<FaUser />}
          required={true}
          defaultValue={"soska@soska.com"}
        />
        <Input
          setFn={setPassword}
          placeholder={t("login.password")}
          type="password"
          name="password"
          icon={<FaLock />}
          required={true}
          defaultValue={123456789}
        />

        <Button
          className="flex items-center justify-center gap-3"
          disabled={isPending}
        >
          {t("login.login")}
          {isPending && (
            <>
              <Spinner type="mini" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default Login;
