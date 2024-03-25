import { IoIosCloseCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

import PropTypes from "prop-types";
import { cloneElement, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
function Input({
  setFn,
  placeholder,
  icon,
  type,
  name,
  required,
  checkFn = () => true,
  invalidInputMsg,
  defaultValue,
  ...options
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [valid, setValid] = useState(false);
  const [activated, setActivated] = useState(false);

  let onChangeFn, inputValue;

  if (options && options.params) options = { ...options, ...options.params };

  if (options.onChange) {
    onChangeFn = options.onChange;
    inputValue = undefined;
  } else {
    onChangeFn = (e) => inputChange(e);
    inputValue = value;
  }

  if (options.reference) {
    options["ref"] = options["reference"];
    delete options["reference"];
  }

  function inputChange(e) {
    setValue(e.target.value);
    setValid(checkFn(e.target.value));
    setActivated(true);

    if (setFn !== undefined) setFn(e.target.value);
  }
  return (
    <div className="relative flex w-full flex-col justify-center">
      <label
        htmlFor={name}
        className="absolute -top-[50%] text-sm font-bold text-neutral-500 [&:lang(ar)]:right-[0] [&:lang(en)]:left-[0]"
      >
        {placeholder}
      </label>
      {cloneElement(
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={inputValue}
          onChange={onChangeFn}
          className={`${checkFn && required ? " pl-6 pr-8 " : " px-3 "}peer w-full rounded border-2 border-neutral-300 py-2  font-bold outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none dark:border-tertiary dark:bg-tertiary dark:text-white dark:placeholder:text-neutral-400`}
        />,
        { ...options },
      )}
      {/* <input
        ref={reference}
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => inputChange(e)}
        className={`${checkFn && required ? " pl-6 pr-8 " : " px-3 "}peer w-full rounded border-2 border-neutral-300 py-2  font-bold outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none dark:border-tertiary dark:bg-tertiary dark:text-white dark:placeholder:text-neutral-400`}
      /> */}
      {icon &&
        cloneElement(icon, {
          className:
            "peer-focus:text-purple-900 absolute [&:lang(ar)]:right-2 [&:lang(en)]:left-2 -translate-y-1/2 top-1/2 text-neutral-600 dark:text-neutral-200 dark:peer-focus:text-purple-600",
        })}
      <AnimatePresence>
        {!valid && activated && (
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute left-2 top-full text-sm font-bold text-red-600"
          >
            {invalidInputMsg}
          </motion.p>
        )}
      </AnimatePresence>
      {!valid && activated && (
        <IoIosCloseCircle className=" absolute text-2xl text-red-500 [&:lang(ar)]:left-2 [&:lang(en)]:right-2" />
      )}
      {valid && activated && (
        <FaCircleCheck className="absolute text-xl text-green-700 [&:lang(ar)]:left-2 [&:lang(en)]:right-2" />
      )}
    </div>
  );
}
Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  checkFn: PropTypes.func,
  icon: PropTypes.object,
  invalidInputMsg: PropTypes.string,
};
export default Input;
