import { cloneElement } from "react";

function MenuList({ options }) {
  return (
    <ul className="absolute right-4 top-6 z-40 overflow-hidden rounded-lg bg-neutral-200 drop-shadow-xl dark:bg-dark dark:text-neutral-100  [&:lang(ar)]:left-4 [&:lang(ar)]:right-auto [&>*]:cursor-pointer  [&>*]:p-2 [&>*]:transition-all [&>*]:duration-300">
      {options.map((el, index) => (
        <li key={index} className="hover:bg-neutral-300 dark:hover:bg-tertiary">
          <button
            className="flex items-center gap-2"
            onClick={!options.fn ? () => {} : options.fn}
          >
            {el.icon && cloneElement(el.icon, { className: "text-purple-600" })}
            {el.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
