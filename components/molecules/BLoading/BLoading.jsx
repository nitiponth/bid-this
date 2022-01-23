import { BounceLoader } from "react-spinners";
function BLoading({ containerStyle }) {
  return (
    <div className="bLoading" style={{ ...containerStyle }}>
      <BounceLoader color="#ffc648" />
    </div>
  );
}

export default BLoading;
