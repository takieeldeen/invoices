function Spinner({ type = "large", color = "purple" }) {
  return (
    <div
      className={`flex items-center justify-center ${type === "large" ? " h-full w-full " : " h-4 w-4 "}`}
    >
      <figure
        className={`${type === "large" ? "h-20 w-20 border-l-4 border-t-4" : "h-4 w-4 border-l-2 border-t-2"} border-${color}-500  h-20 w-20  animate-spin rounded-full  `}
      ></figure>
    </div>
  );
}

export default Spinner;
