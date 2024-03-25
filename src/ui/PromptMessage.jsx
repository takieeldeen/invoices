import useOutsideClick from "../hooks/useOutsideClick";

function PromptMessage() {
  const ref = useOutsideClick();
  return (
    <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center backdrop-blur-sm">
      <div
        ref={ref}
        className="flex flex-col gap-2 bg-neutral-50 text-neutral-800 dark:bg-dark dark:text-neutral-200"
      >
        <p>?</p>
        <div className="flex w-full justify-end gap-2">
          <button>Confirm</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PromptMessage;
