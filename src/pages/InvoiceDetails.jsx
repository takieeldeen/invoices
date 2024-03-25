import { FaChevronLeft, FaCircle } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import Prompt from "../ui/Prompt";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utilities/formatDate";
import { formatPrice } from "../utilities/formatPrice";
import useInvoice from "../features/invoices/useInvoice";
import Spinner from "../ui/Spinner";
import useDeleteInvoice from "../features/invoices/useDeleteInvoice";
import toast from "react-hot-toast";
import EmptyResource from "../ui/EmptyResource";
import PageNotFound from "./PageNotFound";
import { useUpdateInvoice } from "../features/invoices/useUpdateInvoice";
import CreateInvoiceForm from "../features/invoices/CreateInvoiceForm";
import Modal from "../ui/Modal";

function InvoiceDetails() {
  const [t, i18n] = useTranslation();
  const { id } = useParams();

  const { isLoading, error, invoiceData, isFetching } = useInvoice(id);
  const { isDeleting, deleteInv } = useDeleteInvoice();
  const { updateInv, isUpdating } = useUpdateInvoice();
  if (isLoading || isUpdating) return <Spinner />;
  const color =
    invoiceData?.status === "Paid"
      ? " bg-green-300/50 text-green-700 dark:bg-green-300/10 dark:text-green-400 "
      : invoiceData?.status === "Pending"
        ? " bg-yellow-300/50 text-yellow-700 dark:bg-yellow-300/10 dark:text-orange-500 "
        : " bg-purple-500/50 text-purple-700 dark:bg-white/10 dark:text-white  ";

  return (
    <div className="flex h-screen w-full flex-col overflow-y-scroll bg-neutral-200 pb-8 dark:bg-dark dark:text-white">
      <NavLink
        className="flex w-auto items-center gap-2 px-6 py-8 font-bold text-purple-900 dark:text-white"
        to="/invoices"
      >
        <FaChevronLeft className="dark:text-purple-500 [&:lang(ar)]:rotate-180" />
        {t("invoiceDetails.back")}
      </NavLink>
      {/* Layout element */}
      <div className="flex flex-col gap-4">
        {/* Controls & status */}
        {invoiceData === undefined ? (
          <PageNotFound />
        ) : (
          <>
            <div className="mx-auto flex w-[90%]  items-center rounded-lg bg-white px-2 py-4 drop-shadow-lg dark:bg-[#1F213A]">
              {/* Status */}
              <div className="flex w-full items-center justify-between px-5 md:justify-start md:gap-8 md:px-10">
                <p>{t("invoiceDetails.title")}</p>
                <p
                  className={`flex items-center gap-1 px-4 text-sm font-bold ${color} dark:rounded-md  dark:py-2`}
                >
                  <FaCircle />
                  {t(`invoiceDetails.status.${invoiceData.status}`)}
                </p>
              </div>
              {/* Desktop Controls */}
              <div className=" w-full items-center justify-end gap-2 sm:hidden md:flex ">
                <Prompt>
                  <Modal>
                    <Modal.Open>
                      <button className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide text-neutral-600 transition-all duration-300 hover:bg-neutral-400">
                        {t("invoiceDetails.controls.edit")}
                      </button>
                    </Modal.Open>

                    <Modal.Container>
                      <CreateInvoiceForm
                        mode="update"
                        editData={{ id, editObj: invoiceData }}
                      />
                    </Modal.Container>
                  </Modal>
                  <Prompt.Open promptName="deleteConfirmation">
                    <button
                      disabled={isDeleting}
                      className="flex gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                    >
                      {t("invoiceDetails.controls.delete")}
                      {isDeleting && <Spinner />}
                    </button>
                  </Prompt.Open>
                  {/* Delete confirmation prompt */}
                  <Prompt.Container promptName="deleteConfirmation">
                    {/* <h3 className="mb-3 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Invoice delete Confirmation
                </h3> */}
                    <p className="mb-4 text-dark dark:text-neutral-200">
                      {t("prompt.delete")}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide  text-neutral-900 transition-all duration-300 hover:bg-neutral-400"
                        onClick={() => close()}
                      >
                        {t("prompt.cancel")}
                      </button>
                      <button
                        onClick={() => deleteInv(invoiceData)}
                        disabled={isDeleting}
                        className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                      >
                        {t("prompt.confirm")}
                        {isDeleting && <Spinner />}
                      </button>
                    </div>
                  </Prompt.Container>

                  {invoiceData.status !== "Paid" && (
                    <Prompt.Open promptName="markAsPaidConfirmation">
                      <button className="w-36 rounded-full bg-purple-700 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-purple-800">
                        {t("invoiceDetails.controls.markPaid")}
                      </button>
                    </Prompt.Open>
                  )}

                  {/* mark as paid confirmation prompt */}
                  <Prompt.Container promptName="markAsPaidConfirmation">
                    {/* <h3 className="mb-3 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Invoice delete Confirmation
                </h3> */}
                    <p className="mb-4 text-dark dark:text-neutral-200">
                      {t("prompt.markPaid")}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide  text-neutral-900 transition-all duration-300 hover:bg-neutral-400"
                        onClick={() => close()}
                      >
                        {t("prompt.cancel")}
                      </button>
                      <button
                        onClick={() =>
                          updateInv({
                            updated: {
                              status: "Paid",
                            },
                            id,
                          })
                        }
                        disabled={isUpdating}
                        className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                      >
                        {t("prompt.confirm")}
                        {isUpdating && <Spinner />}
                      </button>
                    </div>
                  </Prompt.Container>
                </Prompt>
              </div>
            </div>
            {isFetching ? (
              <Spinner />
            ) : (
              <>
                <div className="mx-auto flex w-[90%] flex-col items-start gap-9  rounded-lg bg-white p-6 text-sm font-semibold drop-shadow-lg dark:bg-[#1F213A]">
                  <div className="flex flex-col gap-9 md:w-full md:flex-row md:items-center md:justify-between">
                    {/* Id & category */}
                    <div>
                      <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                        #
                        <strong className="text-neutral-950 dark:text-white">
                          {invoiceData.id}
                        </strong>{" "}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-300">
                        {invoiceData.description}
                      </p>
                    </div>
                    {/* Address */}
                    <p className="text-sm text-neutral-500 dark:text-neutral-300">
                      {invoiceData.from_street}
                      <br />
                      {invoiceData.from_city}
                      <br />
                      {invoiceData.from_postcode}
                      <br />
                      {invoiceData.from_country}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-9 md:flex-row md:gap-0">
                    <div className="flex w-full ">
                      {/* Dates */}
                      <div className="flex w-1/2 flex-col justify-between">
                        {/* Invoice Date */}
                        <p className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-300">
                          {t("invoiceDetails.invoiceDate")}{" "}
                          <strong className="text-lg text-neutral-950 dark:text-white">
                            {formatDate(invoiceData.created_at)}
                          </strong>
                        </p>
                        {/* Payment Date */}
                        <p className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-300">
                          {t("invoiceDetails.paymentDate")}{" "}
                          <strong className="text-lg text-neutral-950 dark:text-white">
                            {formatDate(invoiceData.to_invoiceDate)}
                          </strong>
                        </p>
                      </div>
                      {/* Billing to */}
                      <p className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-300">
                        {t("invoiceDetails.to")}{" "}
                        <strong className="text-lg text-neutral-950 dark:text-white">
                          {invoiceData.to_name}
                        </strong>
                        <span>
                          {invoiceData.to_street}
                          <br />
                          {invoiceData.to_city}
                          <br />
                          {invoiceData.to_postcode}
                          <br />
                          {invoiceData.to_country}
                        </span>
                      </p>
                    </div>
                    {/* Email */}
                    <p className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-300">
                      {t("invoiceDetails.toEmail")}{" "}
                      <strong className="text-lg text-neutral-950 dark:text-white">
                        {invoiceData.to_email}
                      </strong>
                    </p>
                  </div>
                  {/* Recipt Desktop version*/}
                  <div className="hidden w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-tertiary md:block">
                    <table className="w-full border-separate border-spacing-4  border border-transparent ">
                      <thead className="text-neutral-600 dark:text-neutral-400 ">
                        <tr className="">
                          <th className="text-left [&:lang(ar)]:text-right">
                            {t("invoiceDetails.bill.itemName")}
                          </th>
                          <th>{t("invoiceDetails.bill.qty")}</th>
                          <th className="text-right">
                            {t("invoiceDetails.bill.price")}
                          </th>
                          <th className="text-right">
                            {t("invoiceDetails.bill.total")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, index) => (
                          <tr key={index}>
                            <td className="">{item.name}</td>
                            <td className="text-center">{item.qty}</td>
                            <td className="text-right">{`${formatPrice(item.price)} ${t("invoiceDetails.currency")} `}</td>
                            <td className="text-right">{`${formatPrice(item.price * item.qty)} ${t("invoiceDetails.currency")} `}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className=" flex items-center justify-between bg-tertiary p-4 text-neutral-200 dark:bg-dark">
                      {t("invoiceDetails.total")}
                      <strong className="text-lg text-neutral-100">{`${formatPrice(invoiceData.total)} ${t("invoiceDetails.currency")} `}</strong>
                    </div>
                  </div>

                  <ul className=" mb-8 flex w-[70%] flex-col gap-4 divide-y-2 self-center overflow-hidden rounded-lg rounded-bl-lg rounded-br-lg bg-neutral-100 dark:divide-neutral-400 dark:bg-tertiary md:hidden md:w-full [&>*]:px-6 [&>*]:py-4">
                    {invoiceData.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex  items-center justify-between gap-4 "
                      >
                        <div>
                          <strong>{item.name}</strong>
                          <p className="text-neutral-600 dark:text-neutral-300">
                            {`${item.qty} \u00D7 ${formatPrice(item.price)} ${t("invoiceDetails.currency")} `}
                          </p>
                        </div>
                        <strong>{`${formatPrice(item.qty * item.price)} ${t("invoiceDetails.currency")} `}</strong>
                      </li>
                    ))}

                    <li className=" flex items-center justify-between bg-tertiary text-neutral-200 dark:bg-dark">
                      Grand Total
                      <strong className="text-lg text-neutral-100">{`${formatPrice(invoiceData.total)} ${t("invoiceDetails.currency")} `}</strong>
                    </li>
                  </ul>
                  {/* Mobile Controls */}
                  <div className="flex w-full items-center justify-end gap-2 md:hidden ">
                    <button className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide text-neutral-600 transition-all duration-300 hover:bg-neutral-400">
                      {t("invoiceDetails.controls.edit")}
                    </button>
                    <Prompt>
                      <Prompt.Open promptName="deleteConfirmation">
                        <button
                          disabled={isDeleting}
                          className="flex gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                        >
                          {t("invoiceDetails.controls.delete")}
                          {isDeleting && <Spinner />}
                        </button>
                      </Prompt.Open>
                      {/* Delete confirmation prompt */}
                      <Prompt.Container promptName="deleteConfirmation">
                        {/* <h3 className="mb-3 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Invoice delete Confirmation
                </h3> */}
                        <p className="mb-4 text-dark dark:text-neutral-200">
                          {t("prompt.delete")}
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide  text-neutral-900 transition-all duration-300 hover:bg-neutral-400"
                            onClick={() => close()}
                          >
                            {t("prompt.cancel")}
                          </button>
                          <button
                            onClick={() => deleteInv(invoiceData)}
                            disabled={isDeleting}
                            className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                          >
                            {t("prompt.confirm")}
                            {isDeleting && <Spinner />}
                          </button>
                        </div>
                      </Prompt.Container>
                      {invoiceData.status !== "Paid" && (
                        <Prompt.Open promptName="markAsPaidConfirmation">
                          <button className="w-36 rounded-full bg-purple-700 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-purple-800">
                            {t("invoiceDetails.controls.markPaid")}
                          </button>
                        </Prompt.Open>
                      )}

                      {/* mark as paid confirmation prompt */}
                      <Prompt.Container promptName="markAsPaidConfirmation">
                        {/* <h3 className="mb-3 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Invoice delete Confirmation
                </h3> */}
                        <p className="mb-4 text-dark dark:text-neutral-200">
                          {t("prompt.markPaid")}
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            className="rounded-full bg-neutral-300 px-6 py-3 text-sm font-bold tracking-wide  text-neutral-900 transition-all duration-300 hover:bg-neutral-400"
                            onClick={() => close()}
                          >
                            {t("prompt.cancel")}
                          </button>
                          <button
                            onClick={() =>
                              updateInv({
                                updated: {
                                  status: "Paid",
                                },
                                id,
                              })
                            }
                            disabled={isUpdating}
                            className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red-600"
                          >
                            {t("prompt.confirm")}
                            {isUpdating && <Spinner />}
                          </button>
                        </div>
                      </Prompt.Container>
                    </Prompt>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InvoiceDetails;
