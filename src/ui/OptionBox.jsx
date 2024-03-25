import { useState } from "react";
import { useTranslation } from "react-i18next";

function OptionBox({ options, id, setStatusValue, registerFn }) {
  const [t, i18n] = useTranslation();
  const [status, setStatus] = useState("Pending");

  const handleChecked = (e) => {
    e.target.checked = true;
    setStatus(e.target.value);
    setStatusValue(e.target.value);
  };

  return (
    <div className="flex gap-2">
      {" "}
      {options.map((option, index) => (
        <div
          key={index}
          className="mx-4 flex items-center gap-4 text-sm font-bold text-neutral-700 dark:text-neutral-200"
        >
          <input
            // onClick={handleChecked}
            type="radio"
            name={id}
            id={id}
            value={option}
            {...registerFn(id)}
            className="relative  h-0 w-0 cursor-pointer transition-all duration-300 before:absolute before:top-1/2 before:block before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-2 before:border-neutral-700 before:content-[''] after:absolute after:top-1/2 after:block after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-neutral-700 after:transition-all  after:content-[''] checked:after:scale-100 dark:before:border-neutral-200 dark:after:bg-neutral-200 [&:lang(ar)]:before:-right-4 [&:lang(ar)]:after:-right-2"
          />
          <label htmlFor="paid">{t(`newBill.status.${option}`)}</label>
        </div>
      ))}
    </div>
  );
}

export default OptionBox;
