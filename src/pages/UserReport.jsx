import {
  FaChevronLeft,
  FaPause,
  FaPen,
  FaPlus,
  FaReceipt,
  FaTrash,
} from "react-icons/fa6";
import profile from "../../public/profiles/avatar.jpg";
import EmptyResource from "../ui/EmptyResource";
import Invoice from "../ui/Invoice";
import { useCurrentViewport } from "../hooks/useCurrentViewport";
import useInvoices from "../features/invoices/useInvoices";
import Spinner from "../ui/Spinner";
import { useTranslation } from "react-i18next";
import Menu from "../ui/Menu";
import MenuList from "../ui/MenuList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSpecificUser } from "../features/users/useSpecificUser";
import { useReports } from "../features/invoices/useReports";
import { formatPrice } from "../utilities/formatPrice";
import Prompt from "../ui/Prompt";
import EditUserForm from "../features/users/EditUserForm";
import Modal from "../ui/Modal";
import { useUpdateUser } from "../features/users/useUpdateUser";

function UserReport() {
  const currentViewPort = useCurrentViewport();
  const { id: user_id } = useParams();
  const { isLoadingReportStats, reportStats } = useReports(user_id);
  const stats = reportStats?.data[0];
  let { isLoading, data: invoices } = useInvoices("", user_id);
  let { isLoading: isLoadingUser, user } = useSpecificUser(user_id);
  const current_user = user?.user;
  const [t] = useTranslation();

  const { isUpdating, update } = useUpdateUser();

  function suspendUser() {
    const currentState = user.user_metadata.suspendUser;
    const requiredState = currentState === true ? false : true;
    const updatedData = {
      id: user_id,
      user_metadata: {
        suspended: requiredState,
      },
    };
    update(updatedData);
  }

  if (isLoading || isLoadingUser || isLoadingReportStats)
    return (
      <div className=" flex w-full flex-col gap-4 overflow-scroll p-4 md:h-screen ">
        <Spinner />
      </div>
    );

  if (
    (invoices === undefined || Object.keys(invoices) === 0) &&
    !isLoading &&
    !isLoadingUser
  )
    return (
      <div className="h-full w-full">
        <img src="./report.svg" alt="" />
      </div>
    );
  return (
    <div className=" flex w-full flex-col gap-4 overflow-scroll p-4 md:h-screen ">
      <Link
        to="/users"
        className="flex items-center gap-2 dark:text-neutral-100"
      >
        <FaChevronLeft className="[&:lang(ar)]:rotate-180" />
        <p className="font-bold  ">{t("report.title")}</p>
      </Link>

      <div className="relative flex h-full flex-col gap-3  md:grid md:grid-cols-6">
        {/* Side Panel */}
        <div className="sticky top-0 w-full divide-y-2 rounded-md bg-neutral-50 p-4 drop-shadow-md dark:bg-[#363B55] dark:text-neutral-50 md:col-span-2 md:h-[87vh] md:overflow-y-scroll ">
          {/* Employee Information */}
          <div className="flex flex-col items-center gap-2 py-4 ">
            <div className="relative flex w-full justify-end">
              <Menu>
                <Menu.Open opens="reportOptions">
                  <button>
                    <FaPen className="text-neutral-600  dark:text-neutral-50" />
                  </button>
                </Menu.Open>
                <Menu.Container name="reportOptions">
                  <ul className="absolute right-4 top-6 z-40 overflow-hidden rounded-lg bg-neutral-200 drop-shadow-xl dark:bg-dark dark:text-neutral-100  [&:lang(ar)]:left-4 [&:lang(ar)]:right-auto [&>*]:cursor-pointer  [&>*]:p-2 [&>*]:transition-all [&>*]:duration-300">
                    <li className="hover:bg-neutral-300 dark:hover:bg-tertiary">
                      <Modal>
                        <Modal.Open modalName="editUserModal">
                          <button className="flex items-center gap-2">
                            <FaPen className="text-purple-700" />
                            {t("report.userOptions.update")}
                          </button>
                        </Modal.Open>
                        <Modal.Container modalName="editUserModal">
                          <EditUserForm id={user_id} />
                        </Modal.Container>
                      </Modal>
                    </li>
                    <li className="hover:bg-neutral-300 dark:hover:bg-tertiary">
                      <Prompt>
                        <Prompt.Open promptName="confirmSuspend">
                          <button
                            className="flex items-center gap-2"
                            onClick={suspendUser}
                          >
                            <FaPause className="text-purple-700" />
                            {t("report.userOptions.suspend")}
                          </button>
                        </Prompt.Open>
                        <Prompt.Container promptName="confirmSuspend">
                          <div className="flex flex-col gap-2">
                            <p className="text-neutral-800 dark:text-neutral-200">
                              {t("prompts.suspend")}?
                            </p>
                            <div className="flex w-full justify-end gap-2">
                              <button className="rounded-md bg-red-600 px-4 py-2 text-neutral-100 transition-all duration-300 hover:bg-red-700">
                                {t("prompts.confirm")}
                              </button>

                              <button
                                className="rounded-md bg-neutral-200 px-4 py-2 text-neutral-800 transition-all duration-300 hover:bg-neutral-100"
                                onClick={close}
                              >
                                {t("prompts.cancel")}
                              </button>
                            </div>
                          </div>
                        </Prompt.Container>
                      </Prompt>
                    </li>
                  </ul>
                </Menu.Container>
              </Menu>
            </div>
            <figure className="mx-auto flex h-24 w-24 overflow-hidden rounded-full border-2 border-purple-700">
              <img
                src={current_user.user_metadata.img_url}
                alt=""
                className="rounded-full p-[3px]"
              />
            </figure>
            <p className="flex flex-col items-center font-extrabold">
              {`${current_user.user_metadata.first_name} ${current_user.user_metadata.last_name}`}
              <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                {t(`report.role_title.${current_user.user_metadata.role}`)}
              </span>
            </p>
          </div>
          {/* Stats */}
          <div className="flex w-full items-center justify-center gap-12 py-4">
            <p className="flex flex-col items-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              <span className="text-xl font-extrabold text-purple-700 dark:text-purple-600">
                {stats.total_invoices}
              </span>
              {t("report.invoiceToday")}
            </p>
            <p className="flex flex-col items-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              <span className="text-xl font-extrabold text-purple-700 dark:text-purple-600">
                {formatPrice(stats.total_payments)}
              </span>
              {t("report.overallSales")}
            </p>
            <p className="flex flex-col items-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              <span className="text-xl font-extrabold text-purple-700 dark:text-purple-600">
                {stats.rank}
              </span>
              {t("report.ranking")}
            </p>
          </div>
          {/* Details */}
          <div className="p-4">
            <p className="mb-4 text-sm font-bold uppercase text-purple-700 dark:text-purple-600">
              {t("report.details")}
            </p>
            <ul className="mb-4 flex flex-col gap-2">
              <li className="flex flex-col font-bold text-neutral-800 dark:text-neutral-50">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                  {t("report.email")}
                </span>
                {current_user.email}
              </li>
              <li className="flex flex-col font-bold text-neutral-800 dark:text-neutral-50">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                  {t("report.phoneNumber")}
                </span>
                01122334455
              </li>
              <li className="flex flex-col font-bold text-neutral-800 dark:text-neutral-50">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                  {t("report.status")}
                </span>
                {t(`report.suspended.${current_user.user_metadata.suspended}`)}
              </li>
              <li className="flex flex-col font-bold text-neutral-800 dark:text-neutral-50">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                  {t("report.role.title")}
                </span>
                {t(`report.role.${current_user.user_metadata.role}`)}
              </li>
            </ul>
            <button className="hover:bg-purple-800g w-full bg-purple-700 p-2 text-neutral-100 transition-all duration-300">
              {t("report.changePermisson")}
            </button>
          </div>
        </div>
        {/* Main Panel */}
        <div className="flex  w-full flex-col gap-3 md:col-span-4  md:h-[87vh] md:overflow-y-scroll">
          <div className="rounded-md bg-neutral-50 p-4 drop-shadow-md dark:bg-[#363B55]">
            <p className="mb-4 text-lg font-extrabold dark:text-neutral-100">
              {t("report.statistics")}
            </p>
            <ul className="flex flex-wrap justify-center gap-2 divide-x-2 md:justify-start">
              <li className=" flex  flex-shrink-0 flex-col gap-3 rounded-md p-2 dark:text-neutral-50">
                <div className=" flex items-center gap-1 md:gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 dark:bg-dark md:h-8 md:w-8">
                    <FaPlus className="text-md text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold  text-neutral-950 dark:text-neutral-200 md:text-base">
                    {t("report.createdInvoice")}
                  </p>
                </div>
                <p className="text-5xl font-bold">{stats.total_created}</p>
              </li>
              <li className="flex flex-shrink-0  flex-col gap-3 rounded-md p-2 dark:text-neutral-50 ">
                <div className=" flex items-center gap-1 md:gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 dark:bg-dark md:h-8 md:w-8">
                    <FaTrash className="text-md text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold  text-neutral-950 dark:text-neutral-200 md:text-base">
                    {t("report.deletedInvoice")}
                  </p>
                </div>
                <p className="text-5xl font-bold">{stats.total_deleted}</p>
              </li>
              <li className="flex flex-shrink-0  flex-col gap-3 rounded-md p-2 dark:text-neutral-50 ">
                <div className=" flex items-center gap-1 md:gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 dark:bg-dark md:h-8 md:w-8">
                    <FaPen className="text-md text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold  text-neutral-950 dark:text-neutral-200 md:text-base">
                    {t("report.updatedInvoice")}
                  </p>
                </div>
                <p className="text-5xl font-bold">{stats.total_updated}</p>
              </li>
              <li className="flex flex-shrink-0  flex-col gap-3 rounded-md p-2 dark:text-neutral-50 ">
                <div className=" flex items-center gap-1 md:gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 dark:bg-dark md:h-8 md:w-8">
                    <FaReceipt className="text-md text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold  text-neutral-950 dark:text-neutral-200 md:text-base">
                    {t("report.avgInvoice")}
                  </p>
                </div>
                <p className="text-5xl font-bold">10</p>
              </li>
            </ul>
          </div>
          {/* User Invoices */}
          <div className="overflow-hidden rounded-md bg-neutral-50 p-4 drop-shadow-md dark:bg-tertiary dark:text-neutral-50 md:h-full">
            <p className="mb-4 text-lg font-extrabold">
              {t("report.invoices")}
            </p>
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="overflow-y-scroll md:max-h-full">
                {invoices.length === 0 ? (
                  <div className="mx-auto w-full text-center md:w-52">
                    <EmptyResource resource="invoices" />
                  </div>
                ) : currentViewPort === "sm" ? (
                  <ul className="flex  w-full flex-col gap-3  px-2 ">
                    {invoices.map((invoice, index) => (
                      <Invoice key={index} invoiceData={invoice} />
                    ))}
                  </ul>
                ) : (
                  <table className="w-full px-2 md:inline-block ">
                    <tbody className=" flex w-full flex-col gap-3">
                      {invoices.map((invoice, index) => (
                        <Invoice key={index} invoiceData={invoice} />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReport;
