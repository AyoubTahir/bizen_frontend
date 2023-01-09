import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineTrash,
  HiOutlinePlus,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";
import {
  useGetUsersQuery,
  useDeleteManyUsersMutation,
} from "../redux/api/usersApiSlice.js";
import Breadcrumb from "../../../components/ui/Breadcrumb.jsx";
import UserItem from "../components/userItem.jsx";
import Loader from "../../../components/ui/Loader.jsx";
import EmptyTableRow from "../../../components/ui/EmptyTableRow.jsx";
import { Link } from "react-router-dom";
import { notify } from "../../../util/toast.js";

const UsersList = () => {
  const [usersIds, setUsersIds] = useState([]);
  const [search, setSearch] = useState("");
  const [dSearch] = useDebounce(search, 1000);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery({ search: dSearch });

  const [
    deleteManyUsers,
    {
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteManyUsersMutation();

  const handleCheckboxChange = (e, id) => {
    console.log(e.target.checked, " ---- ", id);
    if (e.target.checked) {
      setUsersIds([...usersIds, id]);
    } else {
      setUsersIds(usersIds.filter((userId) => userId !== id));
    }
  };
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setUsersIds(users.ids);
    } else {
      setUsersIds([]);
    }
  };

  let content;

  if (isLoading) {
    content = (
      <EmptyTableRow>
        <Loader />
      </EmptyTableRow>
    );
  } else if (isError) {
    content = (
      <EmptyTableRow color="red" bg="#f3f3f3">
        {error?.data?.message}
      </EmptyTableRow>
    );
  } else if (isSuccess) {
    content = users.ids.map((id) => (
      <UserItem
        key={id}
        id={id}
        handleCheckboxChange={handleCheckboxChange}
        usersIds={usersIds}
      />
    ));
  }

  if (deleteSuccess) {
    notify("success", "Users Deleted Successfully");
  } else if (deleteError) {
  }

  return (
    <div className="py-8 px-2 lg:px-8">
      <Breadcrumb title="Users" />
      <div className="px-2 lg:px-8 flex justify-between items-center mb-8">
        <div className="mr-1">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="absolute h-7 w-7 text-gray top-[7px] left-[5px]" />
            <input
              type="text"
              placeholder="Search"
              className="py-2 pl-10 pr-3 xl:w-80 w- w-56 border border-gray rounded"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-1">
          <Link
            to="new"
            className="bg-secondary hover:bg-secondaryDark transition-all text-white px-3 sm:px-7 py-3 rounded"
          >
            <HiOutlinePlus className="inline-block h-5 w-5 mt-[-4px] xl:mr-1" />
            <span className="hidden xl:inline">Add User</span>
          </Link>
          <button
            className={`bg-[#f44336] hover:bg-[red] transition-all text-white px-3 sm:px-7 py-3 rounded ${
              usersIds.length < 2 && "hidden"
            }`}
            onClick={async () => {
              if (
                confirm("Are you sure you want to delete all this users") ==
                true
              ) {
                await deleteManyUsers({ ids: usersIds });
              }
            }}
          >
            <HiOutlineTrash className="inline-block h-5 w-5 mt-[-4px] xl:mr-1" />
            <span className="hidden xl:inline">Delete All</span>
          </button>
        </div>
      </div>
      <div className="px-2 lg:px-8">
        <div className="w-full overflow-auto">
          <table className="w-full min-w-[35rem]">
            <thead className="border border-[#dddddd] h-[45px] rounded">
              <tr>
                <th>
                  <input type="checkbox" onChange={handleCheckAll} />
                </th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example" className="mt-5">
          <ul className="flex justify-center items-center gap-2">
            <li>
              <a href="#" className="">
                <HiChevronDoubleLeft />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-1 px-3 rounded border border-[#cacaca] hover:bg-[#f3f3f3]"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-1 px-3 rounded border border-[#cacaca] hover:bg-[#f3f3f3]"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="py-1 px-3 rounded border border-[#cacaca] hover:bg-[#f3f3f3]"
              >
                3
              </a>
            </li>
            <li>
              <a href="#" className="">
                <HiChevronDoubleRight />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersList;
