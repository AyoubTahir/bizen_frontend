const Role = ({ roles }) => {
  let role = "user";
  let bg = "bg-secondary";

  if (roles.includes("admin")) {
    role = "admin";
    bg = "bg-[#A020F0]";
  } else if (roles.includes("manager")) {
    role = "manager";
    bg = "bg-[#FFA500]";
  }

  return (
    <div className="flex items-center">
      <div
        className={`h-3 w-3 ${bg} rounded-full inline-block mr-1 mt-[2px]`}
      ></div>
      <span>{role}</span>
    </div>
  );
};

export default Role;
