import Statbox from "../features/dashboard/Statbox";
import Piechart from "../features/dashboard/Piechart";
import Movements from "../features/dashboard/MovementsList";
import { useTranslation } from "react-i18next";
import Users from "./Users";
import { PieChart } from "recharts";
import Example from "../features/dashboard/Piechart";
// import PieChartComp from "../features/dashboard/Piechart";
function Dashboard() {
  const [t, i18n] = useTranslation();
  const data = [
    { name: t("dashboard.graphs.status.Paid"), value: 400 },
    { name: t("dashboard.graphs.status.Pending"), value: 300 },
    { name: t("dashboard.graphs.status.Draft"), value: 300 },
  ];
  return (
    <div className="h-screen  w-full flex-col items-start gap-2 overflow-x-hidden overflow-y-scroll p-4 md:grid md:grid-cols-2 md:overflow-y-hidden">
      <div className="grid  h-full w-full   grid-cols-2 content-start gap-2">
        <Statbox
          stat={{
            title: t("dashboard.totalInvoice"),
            count: 201,
            price: "650,000.00",
          }}
        />
        <Statbox
          stat={{
            title: t("dashboard.paidInvoice"),
            count: 123,
            price: "450,000.00",
          }}
        />
        <Statbox
          stat={{
            title: t("dashboard.pendingInvoice"),
            count: 64,
            price: "50,000.00",
          }}
        />
        <Statbox
          stat={{
            title: t("dashboard.draftsInvoice"),
            count: 25,
            price: "150,000.00",
          }}
        />
        <div className="text-  col-span-2 h-3/5 overflow-hidden">
          <Users type="min" />
        </div>
      </div>
      <div className="mt-2 grid h-full w-full grid-cols-2 content-start gap-2 md:mt-0">
        <div className="flex h-full w-full flex-col gap-2 rounded-xl bg-neutral-100 p-2 dark:bg-tertiary">
          <p className="text-sm font-bold dark:text-neutral-100">
            {t("dashboard.graphs.action.title")}
          </p>
          <div>
            <p className="text-2xl font-semibold dark:text-neutral-100">
              320,000.00{" "}
              <span className="text-sm">
                {t("dashboard.graphs.action.currency")}
              </span>
            </p>
            <p className="text-xs font-extrabold text-neutral-500 dark:text-neutral-400">
              {t("dashboard.graphs.action.timing")}
            </p>
          </div>
          <div className="rounded-md dark:bg-violet-300">
            <Example
              data={[
                { name: t("dashboard.graphs.status.Paid"), value: 400 },
                { name: t("dashboard.graphs.status.Pending"), value: 300 },
                { name: t("dashboard.graphs.status.Draft"), value: 300 },
              ]}
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2 rounded-xl bg-neutral-100 p-2 dark:bg-tertiary">
          <p className="text-sm font-bold dark:text-neutral-100">
            {t("dashboard.graphs.status.title")}
          </p>
          <div>
            <p className="text-2xl font-semibold dark:text-neutral-100">
              650,000.00{" "}
              <span className="text-sm">
                {t("dashboard.graphs.action.currency")}
              </span>
            </p>
            <p className="text-xs font-extrabold text-neutral-500 dark:text-neutral-400">
              {t("dashboard.graphs.action.timing")}{" "}
            </p>
          </div>
          <div className="rounded-md dark:bg-violet-300">
            <Example
              data={[
                { name: t("dashboard.graphs.action.create"), value: 400 },
                { name: t("dashboard.graphs.action.delete"), value: 300 },
                { name: t("dashboard.graphs.action.update"), value: 300 },
              ]}
            />
          </div>
        </div>
        <div className="col-span-2 h-full overflow-hidden rounded-md bg-neutral-100 ">
          <Movements />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
