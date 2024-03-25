import { useTranslation } from "react-i18next";
import { useMovements } from "../invoices/useMovements";
import Spinner from "../../ui/Spinner";

function Movements() {
  const [t, i18n] = useTranslation();
  const { data: movements, isPending } = useMovements();
  const data = movements?.data;
  if (isPending)
    return (
      <div className="h-full w-full">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full rounded-lg bg-neutral-100 p-4 drop-shadow-lg dark:bg-tertiary dark:text-neutral-100">
      <p className=" mb-5 text-sm font-semibold">{t("actions.title")}</p>
      <ul className="grid w-full grid-cols-5 p-2 text-center text-sm">
        <li>{t("actions.user")}</li>
        <li>{t("actions.date")}</li>
        <li>{t("actions.action")}</li>
        <li>{t("actions.status")}</li>
        <li>{t("actions.price")}</li>
      </ul>
      <ul className="flex h-44 flex-col gap-2 overflow-y-scroll">
        {data.map((movement, index) => (
          <li
            key={index}
            className={`grid grid-cols-5 rounded-full   ${movement.status.toLowerCase() === "pending" ? " bg-orange-700 " : movement.status.toLowerCase() === "paid" ? "bg-green-700" : "bg-purple-800"}  p-2 text-center text-sm text-purple-100`}
          >
            <span>{`${movement.raw_user_meta_data.first_name} ${movement.raw_user_meta_data.last_name}`}</span>
            <span>28-03-2023</span>
            <span>{t(`actions.actions.${movement.action}`)}</span>
            <span>{t(`actions.statusOptions.${movement.status}`)}</span>
            <span>28,000</span>
          </li>
        ))}
        {/* <li className="grid grid-cols-5 rounded-full bg-green-700 p-2 text-center text-sm text-purple-100">
          <span>Takie Eldeen</span>
          <span>28-03-1998</span>
          <span>Creation</span>
          <span>Pending</span>
          <span>28,000</span>
        </li>
        <li className="grid grid-cols-5 rounded-full bg-purple-800 p-2 text-center text-sm text-purple-100">
          <span>Takie Eldeen</span>
          <span>28-03-1998</span>
          <span>Creation</span>
          <span>Pending</span>
          <span>28,000</span>
        </li>
        <li className="grid grid-cols-5 rounded-full bg-green-700 p-2 text-center text-sm text-purple-100">
          <span>Takie Eldeen</span>
          <span>28-03-1998</span>
          <span>Creation</span>
          <span>Pending</span>
          <span>28,000</span>
        </li> */}
      </ul>
    </div>
  );
}

export default Movements;
