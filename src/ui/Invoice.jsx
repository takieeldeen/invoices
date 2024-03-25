import { useTranslation } from "react-i18next";
import { FaChevronRight, FaDotCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import { formatPrice } from "../utilities/formatPrice";
import { useCurrentViewport } from "../hooks/useCurrentViewport";

function Invoice({ invoiceData }) {
  const currentViewPort = useCurrentViewport();

  const [t, i18n] = useTranslation();

  let stateStyle;
  switch (invoiceData.status) {
    case "Paid":
      stateStyle =
        " bg-green-300/50 text-green-700 dark:bg-green-300/10 dark:text-green-400 ";
      break;
    case "Pending":
      stateStyle =
        " bg-yellow-300/50 text-yellow-700 dark:bg-yellow-300/10 dark:text-orange-500 ";
      break;
    case "Draft":
      stateStyle =
        " bg-purple-500/50 text-purple-700 dark:bg-white/10 dark:text-white ";
  }
  return (
    <>
      {currentViewPort === "sm" ? (
        <li>
          <NavLink
            to={`/invoices/${invoiceData.id}`}
            className="flex flex-col gap-4 rounded-lg bg-neutral-100 p-6  text-white drop-shadow-md dark:bg-[#1F213A]"
          >
            <div className="flex justify-between ">
              <p className="text-sm font-bold tracking-wide text-neutral-700 dark:text-white">
                <span className="text-purple-700">#</span>
                {invoiceData.id}
              </p>

              <p className="text-neutral-700 dark:text-white">
                {invoiceData.to_name}
              </p>
            </div>
            <div className="flex items-center justify-between  ">
              <div>
                <p className="text-neutral-600 dark:text-neutral-300 [&:lang(ar)]:text-right">
                  {`${t("invoice.due")}  ${formatDate(invoiceData.to_invoiceDate)}`}
                </p>
                <p className="font-bold text-neutral-900 dark:text-white [&:lang(ar)]:text-right">
                  {`${formatPrice(invoiceData.total)} ${t("invoice.currency")}`}
                </p>
              </div>
              <div>
                <div
                  className={`flex items-center justify-center gap-2 rounded-md ${stateStyle} px-5 py-2 font-bold [&:lang(ar)]:flex-row-reverse`}
                >
                  <FaDotCircle /> {t(`invoice.status.${invoiceData.status}`)}
                </div>
              </div>
            </div>
          </NavLink>
        </li>
      ) : (
        <tr className=" grid grid-cols-[repeat(5,minmax(0,1fr)),0.25fr] items-center  rounded-lg bg-neutral-100 px-2 py-4 text-sm drop-shadow-md dark:bg-[#1F213A] dark:text-white">
          <td className="flex items-center justify-center font-bold">
            <span className="text-purple-700">#</span>
            {invoiceData.id}
          </td>
          <td className="flex items-center justify-center">
            {`${t("invoice.due")} ${formatDate(invoiceData.to_invoiceDate, "ar-su")}`}
          </td>
          <td className="flex items-center justify-center">
            {invoiceData.to_name}
          </td>
          <td className="font-bold">{`${formatPrice(invoiceData.total)} ${t("invoice.currency")} `}</td>
          <td
            className={`flex items-center justify-center gap-1 rounded-md ${stateStyle} px-5 py-2 font-bold `}
          >
            <FaDotCircle /> {t(`invoice.status.${invoiceData.status}`)}
          </td>
          <td className="flex items-center justify-center">
            <NavLink to={`/invoices/${invoiceData.id}`}>
              <FaChevronRight className="font-bold text-purple-900 [&:lang(ar)]:rotate-180" />
            </NavLink>
          </td>
        </tr>
      )}
    </>
  );
}

export default Invoice;
