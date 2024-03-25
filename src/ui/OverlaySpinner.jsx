import Spinner from "./Spinner";

function OverlaySpinner() {
  return (
    <div className="absolute z-50 h-full w-full backdrop-blur-sm">
      <Spinner />
    </div>
  );
}

export default OverlaySpinner;
