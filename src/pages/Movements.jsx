import { Link } from "react-router-dom";
import profile from "../../public/profile.jpg";
import { FaCheck } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useMovements } from "../features/invoices/useMovements";
import Spinner from "../ui/Spinner";

function Movements() {
  // const data = [
  //   {
  //     user: "Takie Eldeen",
  //     action: "create",
  //     invId: 1,
  //     status: "Paid",
  //     date: "13-01-2023",
  //     price: 25000,
  //   },
  //   {
  //     user: "Takie Eldeen",
  //     action: "update",
  //     invId: 1,
  //     status: "Pending",
  //     date: "13-01-2023",
  //     price: 25000,
  //   },
  //   {
  //     user: "Takie Eldeen",
  //     action: "delete",
  //     invId: 1,
  //     status: "Draft",
  //     date: "13-01-2023",
  //     price: 25000,
  //   },
  // ];
  const [t] = useTranslation();
  const { data: movements, isPending } = useMovements();
  const data = movements?.data;
  console.log(data);
  if (isPending)
    return (
      <div className="h-full w-full">
        <Spinner />
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-[55rem] self-start p-2 md:p-12">
      <h2 className="mb-4 text-lg font-bold dark:text-neutral-200">
        {t("actions.title")}
      </h2>
      <div className="drop-shadow-lg">
        <ul className=" grid w-full grid-cols-5 bg-neutral-300 py-2 text-center text-sm font-bold dark:bg-tertiary dark:text-neutral-200 md:grid-cols-6">
          <li>{t("actions.user")}</li>
          <li>{t("actions.action")}</li>
          <li>{t("actions.id")}</li>
          <li className="hidden md:inline-block">{t("actions.status")}</li>
          <li>{t("actions.date")}</li>
          <li>{t("actions.price")}</li>
        </ul>
        <ul className="h-[70vh] divide-y-4 divide-neutral-200 overflow-y-scroll dark:divide-dark dark:text-neutral-200">
          {data.map((movement, index) => (
            <li key={index}>
              <Link
                to={`/invoices/${movement.invoice_id}`}
                className="grid grid-cols-5 items-center bg-neutral-100 py-2 text-center text-xs font-bold dark:bg-[#1F213A] md:grid-cols-6 md:text-sm"
              >
                <div className="md:flex md:items-center md:justify-center md:gap-2">
                  <img
                    className="hidden h-8 w-8 rounded-full md:block"
                    src={movement.raw_user_meta_data.img_url}
                    alt=""
                  />
                  <span>{`${movement.raw_user_meta_data.first_name} ${movement.raw_user_meta_data.last_name}`}</span>
                </div>
                <span
                  className={`rounded-full ${movement.action === "create" ? "bg-green-500/60 text-green-950 dark:bg-green-500/30 dark:text-green-500" : movement.action === "update" ? "bg-purple-500/60 text-purple-950 dark:bg-purple-500/30 dark:text-purple-400" : "bg-red-500/60 text-red-950 dark:bg-red-500/30 dark:text-red-500"} py-1 font-extrabold uppercase  md:mx-auto md:w-24`}
                >
                  {t(`actions.actions.${movement.action}`)}
                </span>
                <span>{movement.invoice_id}</span>
                <span
                  className={`items-center justify-center gap-2 rounded-full py-1  font-extrabold capitalize md:flex ${movement.status.toLowerCase() === "pending" ? " text-orange-600 dark:text-orange-400 [&:lang(ar)]:text-xs " : movement.status.toLowerCase() === "paid" ? " text-green-800 dark:text-green-400" : "text-purple-800 dark:text-purple-400"} hidden md:mx-auto md:w-24 `}
                >
                  {movement.status.toLowerCase() === "pending" ? (
                    <MdPendingActions className="text-lg" />
                  ) : movement.status.toLowerCase() === "paid" ? (
                    <FaCheck />
                  ) : (
                    <RiDraftLine className="text-lg" />
                  )}
                  {t(`actions.statusOptions.${movement.status}`)}
                </span>
                <span>13-01-2023</span>
                <span className={`text-green-700 dark:text-green-500`}>
                  25,000{" "}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movements;
