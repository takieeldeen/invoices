import { FaUserPlus } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useUsers } from "../features/users/useUsers";
import Spinner from "../ui/Spinner";
import { formatDate } from "../utilities/formatDate";
import { useTranslation } from "react-i18next";
import EditUserForm from "../features/users/EditUserForm";

function Users({ type = "auto" }) {
  const { users: data, isLoading } = useUsers();
  const [t, i18n] = useTranslation();
  return (
    <div className="mr-4 h-full w-full overflow-y-scroll p-2 py-8 md:self-start md:px-8">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className=" mb-4 flex items-center justify-between ">
            <h2 className=" text-sm font-extrabold dark:text-neutral-200">
              {t("users.title")} ({data.length})
            </h2>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-md bg-purple-800 px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-purple-700"
            >
              <FaUserPlus />
              {t("users.add")}
            </Link>
          </div>
          <div>
            <ul
              className={`mb-3 grid grid-cols-4 rounded-md bg-neutral-100 py-4  text-center text-xs font-extrabold drop-shadow-md dark:bg-tertiary dark:font-normal dark:text-neutral-50 md:mx-auto md:max-w-[56rem]  ${type === "auto" ? " md:grid-cols-7 " : ""}`}
            >
              <li className="">{t("users.username")}</li>
              <li
                className={`hidden ${type === "auto" ? "md:inline-block" : ""} `}
              >
                {t("users.userId")}
              </li>
              <li
                className={`hidden ${type === "auto" ? "md:inline-block" : ""} `}
              >
                {t("users.email")}
              </li>
              <li>{t("users.role.title")}</li>
              <li
                className={`hidden ${type === "auto" ? "md:inline-block" : ""} `}
              >
                {t("users.joinDate")}
              </li>
              <li>{t("users.lastRegistration")}</li>
              <li>{t("users.status.title")}</li>
            </ul>
            <ul className="relative z-0 flex max-h-[24rem] flex-col gap-2 overflow-y-scroll md:mx-auto md:max-w-[56rem]">
              {data.map((user, index) => (
                <li key={index} className="px-2">
                  <Link
                    to={`/reports/${user.id}`}
                    className={`relative z-20 grid grid-cols-4 items-center rounded-md bg-neutral-100 px-2 py-6 text-center text-xs font-bold drop-shadow-md dark:bg-[#1F213A] dark:text-neutral-200 ${type === "auto" ? "  md:grid-cols-7 " : ""} `}
                  >
                    <div className="md:flex md:items-center md:gap-2">
                      <img
                        src={user.user_metadata.img_url}
                        className={`hidden h-8 w-8 rounded-full   ${type === "auto" ? " md:inline-block " : ""}`}
                        alt=""
                      />
                      <p className="font-extrabold">
                        {`${user.user_metadata.first_name} ${user.user_metadata.last_name}`}
                        <br />
                        <span
                          className={`font-normal text-neutral-600 dark:text-neutral-400   ${type === "auto" ? " md:hidden " : ""}`}
                        >
                          {user.email}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`${type === "auto" ? " md:inline-block " : ""}  hidden `}
                    >{`${user.id.split("-")[0]}...`}</span>
                    <span
                      className={`${type === "auto" ? " md:inline-block " : ""} hidden `}
                    >
                      {user.email}
                    </span>
                    <p className="font-extrabold capitalize">
                      {user.user_metadata.role === "admin"
                        ? t("users.role.admin")
                        : t("users.role.user")}
                      <br />
                      <span
                        className={`${type === "auto" ? "  md:hidden " : ""} font-normal text-neutral-600 dark:text-neutral-400`}
                      >
                        {`${user.id.split("-")[0]}...`}
                      </span>
                    </p>
                    <span
                      className={`${type === "auto" ? "  md:inline-block " : ""} hidden `}
                    >
                      {formatDate(user.created_at, {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {formatDate(user.last_sign_in_at, {
                        weekday: "long",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                    <span className="font-[600]">
                      {!user.user_metadata.suspended
                        ? t("users.status.active")
                        : t("users.status.suspended")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
