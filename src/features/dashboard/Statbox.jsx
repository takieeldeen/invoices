import { useTranslation } from "react-i18next";
import { LiaFileInvoiceSolid } from "react-icons/lia";

function Statbox({ stat }) {
  const [t, i18n] = useTranslation();
  return (
    <div className="flex h-24 w-full justify-between rounded-xl bg-neutral-100 p-2 drop-shadow-md dark:bg-tertiary">
      <div className="flex flex-col justify-between">
        <p className=" text-sm font-semibold dark:text-neutral-100">
          {stat?.title}
        </p>
        <p className="text-4xl font-semibold dark:text-neutral-100">
          {stat?.count}
        </p>
        <p className="font-bold text-purple-600 dark:text-purple-400">
          {stat?.price}{" "}
          <span className="text-xs font-extrabold ">
            {t("dashboard.graphs.action.currency")}
          </span>
        </p>
      </div>
      <div>
        <LiaFileInvoiceSolid className="text-5xl text-purple-700" />
      </div>
    </div>
  );
}

export default Statbox;
