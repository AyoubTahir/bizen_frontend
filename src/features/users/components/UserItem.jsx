import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useSelector } from "react-redux";
import {
  selectUserById,
  useDeleteUserMutation,
} from "../redux/api/usersApiSlice";
import Role from "./Role.jsx";
import { notify } from "../../../util/toast.js";
import { Link } from "react-router-dom";

const UserItem = ({ id, handleCheckboxChange, usersIds }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const user = useSelector((state) => selectUserById(state, id));

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      notify("success", "User Deleted Successfully");
    }
  }, [isSuccess]);

  if (!user) {
    return;
  }

  return (
    <>
      <tr className="h-1">
        <th></th>
      </tr>
      <tr className="h-[60px] text-sm bg-[#f3f3f3]">
        <th>
          <input
            type="checkbox"
            name="check"
            checked={usersIds.includes(user.id)}
            onChange={(e) => handleCheckboxChange(e, user.id)}
          />
        </th>
        <th className="font-medium">{`${user.firstname} ${user.lastname}`}</th>
        <th className="font-medium">{user.email}</th>
        <th className="font-medium">
          <Role roles={user.roles} />
        </th>
        <th className="font-medium">
          <span
            className={`${
              user.active ? "bg-[#04de04]" : "bg-[#f44336]"
            } py-1 px-4 text-white rounded-full`}
          >
            {user.active ? "Active" : "Inactive"}
          </span>
        </th>
        <th className="font-medium">
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Link to={`/users/${user.id}/edit`}>
                <HiOutlinePencilSquare className="h-6 w-6 cursor-pointer hover:text-secondary transition-all" />
              </Link>
              <HiOutlineTrash
                onClick={async () => {
                  if (
                    confirm("Are you sure you want to delete this user") == true
                  ) {
                    await deleteUser({ id: user.id });
                  }
                }}
                className="h-6 w-6 cursor-pointer hover:text-[red] transition-all"
              />
            </div>
          </div>
        </th>
      </tr>
    </>
  );
};

export default UserItem;
