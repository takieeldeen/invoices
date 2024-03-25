import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import useOutsideClick from "../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";

const PromptContext = createContext();
function Prompt({ children }) {
  const [openedPrompt, setOpenedPromt] = useState("");
  const open = setOpenedPromt;
  const close = () => setOpenedPromt("");
  return (
    <PromptContext.Provider value={{ close, open, openedPrompt }}>
      {children}
    </PromptContext.Provider>
  );
}

function Open({ promptName, children }) {
  const { open } = useContext(PromptContext);
  return cloneElement(children, { onClick: () => open(promptName) });
}

function Container({ promptName, children }) {
  const { openedPrompt, close } = useContext(PromptContext);
  const promptRef = useOutsideClick(close, true);
  if (promptName !== openedPrompt) return null;
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="absolute left-0 top-0 flex h-screen w-full items-center justify-center backdrop-blur-sm"
      >
        <div
          ref={promptRef}
          className="relative flex  flex-col rounded-md bg-neutral-200 px-8 py-8 pb-4 drop-shadow-md dark:bg-dark"
        >
          <Button
            className="absolute right-1 top-1 bg-transparent text-purple-800 hover:bg-transparent  dark:text-white"
            onClick={() => close()}
          >
            <FaTimes />
          </Button>
          {cloneElement(children, { close })}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
Prompt.Open = Open;
Prompt.Container = Container;
export default Prompt;
