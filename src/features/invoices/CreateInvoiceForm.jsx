import Input from "../../ui/Input";

import { FaCalendar, FaCity, FaFlag, FaTimes, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail, MdLocalPostOffice, MdReceipt } from "react-icons/md";
import Button from "../../ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { handleRefParams } from "../../utilities/handleRefParams";
import ItemsInput from "../../ui/ItemsInput";
import { useState } from "react";
import { useCreateInvoice } from "./useCreateInvoice";
import Spinner from "../../ui/Spinner";
import OptionBox from "../../ui/OptionBox";
import { useUpdateInvoice } from "./useUpdateInvoice";
<<<<<<< HEAD
import { useUser } from "../users/useUser";
import OverlaySpinner from "../../ui/OverlaySpinner";
=======
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74

function CreateInvoiceForm({ close, mode = "new", editData = {} }) {
  const ref = useOutsideClick(close, true);

  const [t, i18n] = useTranslation();

  const [items, setItems] = useState();
  const [total, setTotal] = useState(editData.editObj?.total || 0);
<<<<<<< HEAD
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useUser();
=======

>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
  //Registering the form using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: mode === "new" ? {} : editData.editObj });
  //Setting the value of total
  setValue("total", total);
  setValue("items", items);
  const { createInv, isCreating } = useCreateInvoice();
  const { updateInv, isUpdating } = useUpdateInvoice();
<<<<<<< HEAD

  const onSubmit = (data) => {
    if (mode === "new") {
      data["created_by"] = currentUser.id;
      data["deleted"] = false;
      createInv(data);
      console.log(
        "creating new Invoice with user id of ",
        currentUser.id,
        "and data of",
        data,
      );
=======
  const onSubmit = (data) => {
    if (mode === "new") {
      createInv(data);
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
    } else {
      updateInv({ updated: data, id: editData.id });
    }
  };

  function handleClose(e) {
    e.preventDefault();
    close();
  }

  return (
    <AnimatePresence>
      <motion.form
        initial={{
          opacity: 0,
          x: "-100%",
        }}
        animate={{
          opacity: 1,
          x: "0%",
        }}
        exit={{
          opacity: 0,
          x: "-100%",
        }}
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-0 mr-2 flex h-screen w-full flex-col gap-6 overflow-y-scroll bg-neutral-200 p-4 drop-shadow-lg dark:bg-dark md:w-96 "
      >
<<<<<<< HEAD
        {(isUpdating || isCreating) && <OverlaySpinner />}
=======
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
        <Button
          className="absolute top-2 bg-transparent hover:bg-transparent [&:lang(ar)]:left-0 [&:lang(en)]:right-0"
          onClick={(e) => handleClose(e)}
        >
          <FaTimes className="text-2xl text-purple-700 dark:text-purple-50" />
        </Button>
        <h2 className="text-2xl font-extrabold dark:text-neutral-100">
          {t(`newBill.${mode}`)}
        </h2>
        {/* Bill From */}
        <div className="flex flex-col gap-9">
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-600">
            {t("newBill.from.billFrom")}
          </p>
          <Input
            placeholder={t("newBill.from.streetAddress")}
            type="text"
            required={true}
            icon={<FaLocationDot />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("from_street"))}
          />
          <div className="flex gap-2">
            <Input
              placeholder={t("newBill.from.city")}
              name="city"
              type="text"
              required={true}
              icon={<FaCity />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("from_city"))}
            />
            <Input
              placeholder={t("newBill.from.postalCode")}
              name="postalCode"
              type="text"
              required={true}
              icon={<MdLocalPostOffice />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("from_postcode"))}
            />
          </div>
          <Input
            placeholder={t("newBill.from.country")}
            name="country"
            type="text"
            required={true}
            icon={<FaFlag />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("from_country"))}
          />
        </div>
        {/* Bill To */}
        <div className="flex flex-col gap-9">
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-600">
            {t("newBill.to.billTo")}
          </p>
          <Input
            placeholder={t("newBill.to.clientName")}
            type="clientName"
            required={true}
            icon={<FaUser />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("to_name"))}
          />
          <Input
            placeholder={t("newBill.to.clientEmail")}
            type="email"
            name="clientEmail"
            required={true}
            icon={<MdAlternateEmail />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("to_email"))}
          />
          <Input
            placeholder={t("newBill.to.streetAddress")}
            type="text"
            name="clientStreet"
            required={true}
            icon={<MdAlternateEmail />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("to_street"))}
          />
          <div className="flex gap-2">
            <Input
              placeholder={t("newBill.to.city")}
              name="Clientcity"
              type="text"
              required={true}
              icon={<FaCity />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("to_city"))}
            />
            <Input
              placeholder={t("newBill.to.postalCode")}
              name="clientPostalCode"
              type="text"
              required={true}
              icon={<MdLocalPostOffice />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("to_postcode"))}
            />
          </div>
          <Input
            placeholder={t("newBill.to.country")}
            name="clientCountry"
            type="text"
            required={true}
            icon={<FaFlag />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("to_country"))}
          />
          <div className="flex gap-2">
            <Input
              placeholder={t("newBill.to.invoiceDate")}
              name="invoiceDate"
              type="date"
              required={true}
              icon={<FaCalendar />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("to_invoiceDate"))}
            />
            <Input
              placeholder={t("newBill.to.paymentTerms")}
              name="paymentTerms"
              type="text"
              required={true}
              icon={<FaFlag />}
              checkFn={(text) => text !== ""}
              invalidInputMsg="You can't leave this field empty"
              params={handleRefParams(register("to_paymentTerms"))}
            />
          </div>
          <Input
            placeholder={t("newBill.to.description")}
            name="projectDescription"
            type="text"
            required={true}
            icon={<MdReceipt />}
            checkFn={(text) => text !== ""}
            invalidInputMsg="You can't leave this field empty"
            params={handleRefParams(register("description"))}
          />
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-600">
            {t("newBill.status.title")}
          </p>
          <OptionBox
            options={["Pending", "Paid", "Draft"]}
            id="status"
            registerFn={register}
          />
        </div>
        {/* Bill From */}
        <div className="flex flex-col gap-9">
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-600">
            {t("newBill.itemList.title")}
          </p>
          {/* Items table */}
          <ItemsInput
            setVal={setItems}
            setTotal={setTotal}
            mode="update"
            editedItems={editData?.editObj?.items}
          />
        </div>
<<<<<<< HEAD
        <input type="text" {...register("items")} name="items" hidden />
        <input name="total" type="text" {...register("total")} hidden />
=======
        <input type="text" {...register("items")} name="items" />
        <input name="total" type="text" {...register("total")} />
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
        <div className="flex gap-3 self-end">
          <Button
            className="bg-tertiary hover:bg-dark dark:hover:bg-blue-950"
            onClick={close}
          >
            {t("newBill.itemList.cancel")}
          </Button>
          <Button
            disabled={isCreating || isUpdating}
            className="bg-purple-500 hover:bg-purple-600 "
          >
            {t("newBill.itemList.save")}
            {isCreating || (isUpdating && <Spinner />)}
          </Button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}

export default CreateInvoiceForm;
