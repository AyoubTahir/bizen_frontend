import { loader } from "../../assets";

const Loader = ({ center }) => {
  if (center)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <img src={loader} className="w-56 h-44" />
      </div>
    );
  return <img src={loader} className="w-56 h-44" />;
};

export default Loader;
