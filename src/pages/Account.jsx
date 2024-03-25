import profileImg from "../../public/profile.jpg";
import { MdEdit } from "react-icons/md";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useUser } from "../features/users/useUser";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { formatDate } from "../utilities/formatDate";
import { useTranslation } from "react-i18next";

function Account() {
  const [t, i18n] = useTranslation();
  const { id } = useParams();
  const { user, isLoading } = useUser(id);
  console.log(user);
  if (isLoading) return <Spinner />;
  return (
    <div className="flex w-full flex-col   gap-4 bg-neutral-200 px-4 py-8 dark:bg-dark  dark:text-neutral-400">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="flex flex-col divide-y-2 divide-neutral-300 ">
            <div className="flex flex-col gap-6 py-4 md:flex-row md:items-center">
              {/* Img Container */}
              <figure className="h-48 w-48 overflow-hidden rounded-full drop-shadow-lg">
                <img src={user.user_metadata.img_url} alt="" />
              </figure>
              {/* General Information */}
              <div className="flex flex-col items-start gap-2">
                <p className="flex gap-2 text-4xl font-light dark:text-neutral-100">
                  {t("profile.name")}:{" "}
                  <span className="font-normal">{`${user.user_metadata.first_name} ${user.user_metadata.last_name}`}</span>
                </p>
                <p className="rounded-full bg-purple-400 px-2 py-1 text-lg font-extrabold capitalize  text-purple-900 drop-shadow-md dark:bg-purple-900 dark:tracking-wide  dark:text-purple-100">
                  {t(`profile.${user.user_metadata.role}`)}
                </p>
              </div>
            </div>
            <div className=" flex w-full justify-start divide-x-2  divide-neutral-300 py-4 text-lg [&:lang(ar)]:divide-x-0">
              <div className="flex flex-col items-end px-2 font-semibold dark:text-neutral-200">
                <p>{t("profile.firstName")} </p>
                <p>{t("profile.lastName")}</p>
                <p>{t("profile.email")}</p>
                <p>{t("profile.phone")}</p>
                <p>{t("profile.role")}</p>
                <p>{t("profile.lastSignedIn")}</p>
                <p>{t("profile.memberSince")}</p>
              </div>
              <div className="flex flex-col items-start px-2">
                <p>{user.user_metadata.first_name}</p>
                <p>{user.user_metadata.last_name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.user_metadata.role}</p>
                <p>{formatDate(user.last_sign_in_at)}</p>
                <p>{formatDate(user.created_at)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
