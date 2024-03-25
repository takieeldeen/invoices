import { cloneElement } from "react";

function Button({ className, color = "purple", children, ...options }) {
  if (className) {
    className =
      ` bg-${color}-900 hover:bg-${color}-950 transition-all duration-300 px-6 py-3 rounded-full text-white font-semibold tracking-wide text-sm ` +
      className;
  } else {
    className = `bg-${color}-900 hover:bg-${color}-950 transition-all duration-300 px-6 py-3 rounded-full text-white font-semibold tracking-wide text-sm`;
  }
  return cloneElement(
    <button className={className}>{children}</button>,
    options,
  );
}

export default Button;
/*
<button className="bg-purple-900 hover:bg-purple-950 transition-all duration-300 px-6 py-3 rounded-full text-white font-semibold tracking-wide text-sm">
          Register
        </button>
*/
