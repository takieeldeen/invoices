import { IoIosAddCircle } from "react-icons/io";

import Invoice from "../ui/Invoice";

import Modal from "../ui/Modal";
import CreateInvoiceForm from "../features/invoices/CreateInvoiceForm";
import { useTranslation } from "react-i18next";

import useInvoices from "../features/invoices/useInvoices";
import Spinner from "../ui/Spinner";
import { useCurrentViewport } from "../hooks/useCurrentViewport";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import EmptyResource from "../ui/EmptyResource";
<<<<<<< HEAD
=======
import { useUser } from "../features/users/useUser";
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74

function Invoices() {
  const [t, i18next] = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("status") || "");

<<<<<<< HEAD
  // const { user: currentUser, isLoading: isLoadingCurrentUser } = useUser();
  let { isLoading, error, data: invoices } = useInvoices(filter);

=======
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useUser();
  console.log(currentUser);
  let { isLoading, error, data: invoices } = useInvoices(filter);
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
  const queryClient = useQueryClient();

  const currentViewPort = useCurrentViewport();

  function handleFilter(e) {
    setFilter(e.target.value);
    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    const x = queryClient.invalidateQueries({ queryKey: ["invoices"] });
  }, [filter, queryClient]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error While loading data</div>;
  // if (invoices.length === 0) return <EmptyResource resource="invoices" />;
  return (
    <div className="relative flex h-screen w-full  bg-neutral-200 dark:bg-dark md:mx-auto md:max-w-[53rem]">
      <div className="w-full px-4 py-8 md:p-8">
        <div className="mb-4 flex justify-between ">
          <div>
            <p className="text-4xl font-[900] dark:text-white [&:lang(ar)]:text-right">
              {t("title")}
            </p>
            <p className="text-sm font-semibold dark:text-neutral-300">{}</p>
          </div>

          <div className="flex items-center gap-4 [&:lang(ar)]:flex-row-reverse">
            {/* Filter Menu */}

            <div className="relative">
              <select
                name="status"
                id=""
                className="bg-transparent text-xs   font-extrabold tracking-wide focus:outline-none dark:text-white [&:lang(ar)]:text-right [&>*]:font-semibold [&>*]:text-neutral-800"
                value={filter}
                onChange={(e) => handleFilter(e)}
              >
                <option value="" defaultValue={t("invoices.filters.title")}>
                  {t("invoices.filters.title")}
                </option>
                <option value="Paid">{t("invoices.filters.paid")}</option>
                <option value="Pending">{t("invoices.filters.pending")}</option>
                <option value="Draft">{t("invoices.filters.draft")}</option>
              </select>
            </div>

            {/* Add Invoices */}
            <Modal>
              <Modal.Open modalName="newInvoice">
                <button className="flex items-center gap-1 rounded-full bg-purple-600 px-1 py-1 pr-4  text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 [&:lang(ar)]:flex-row-reverse">
                  <IoIosAddCircle className="text-4xl" /> {t("invoices.new")}
                </button>
              </Modal.Open>
              <Modal.Container modalName="newInvoice">
                <CreateInvoiceForm />
              </Modal.Container>
            </Modal>
          </div>
        </div>
        {/* Invoices container */}
        {/* Desktop Version */}
        {invoices.length === 0 ? (
          <EmptyResource resource="invoices" />
        ) : currentViewPort === "sm" ? (
          <ul className="flex h-[80dvh] w-full flex-col gap-3 overflow-y-scroll px-2 ">
            {invoices.map((invoice, index) => (
              <Invoice key={index} invoiceData={invoice} />
            ))}
          </ul>
        ) : (
          <table className="w-full px-2 md:inline-block md:h-[80vh] md:overflow-y-scroll">
            <tbody className=" flex w-full flex-col gap-3">
              {invoices.map((invoice, index) => (
                <Invoice key={index} invoiceData={invoice} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Invoices;
