import { Link } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  return (
    <div className="flex justify-between mb-20">
      <div className="flex gap-3 items-end">
        <h2 className="text-3xl font-extrabold">{title}</h2>
        <div className="text-gray">
          <Link to="/">Dashboard</Link> / <span>User</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Breadcrumb;
