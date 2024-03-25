import { useTranslation } from "react-i18next";
import wrongRoute from "../../public/404.svg";

function PageNotFound() {
  const [t, i18n] = useTranslation();
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <img src={wrongRoute} className="scale-[0.6]" alt="" />
      <p className="text-xl font-bold text-purple-700 dark:text-neutral-200">
        {t("wrongRoute")}
      </p>
    </div>
  );
}

export default PageNotFound;
