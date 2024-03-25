import { cloneElement, createContext, useContext, useState } from "react";
const MenuContext = createContext();
function Menu({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <MenuContext.Provider value={{ open, close, openName }}>
      {children}
    </MenuContext.Provider>
  );
}

function Open({ children, opens: opensMenu }) {
  const { open } = useContext(MenuContext);
  return cloneElement(children, { onClick: () => open(opensMenu) });
}

function Container({ children, name }) {
  const { close, openName } = useContext(MenuContext);
  // const ref = useOutsideClick(close, true);
  if (openName !== name) return null;
  return cloneElement(children, {});
}

Menu.Open = Open;
Menu.Container = Container;

export default Menu;
