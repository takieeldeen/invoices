import { useTranslation } from "react-i18next";
import noData from "../../public/noData.svg";
function EmptyResource({ resource }) {
  const [t, i18n] = useTranslation();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <img src={noData} className="h-2/5" alt="" />
      <p className="text-xl font-bold text-purple-700 dark:text-neutral-200">
        {`${t("emptyResources.msgStart")} ${t(`emptyResources.${resource}`)} ${t("emptyResources.msgEnd")}`}
      </p>
    </div>
  );
}

export default EmptyResource;
