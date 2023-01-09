import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FromError from "../../../components/helpers/FromError";
import { useUpdateUserMutation } from "../redux/api/usersApiSlice";
import { notify } from "../../../util/toast";

const EditUserForm = ({ user }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    password: "",
    roles: user?.roles,
    active: user?.active ? true : false,
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log({ id: user.id, ...inputs });
    updateUser({ id: user.id, ...inputs });
  };

  if (isSuccess && !isError && !isLoading) {
    setTimeout(() => {
      notify("success", "User Updated Successfully");
      navigate("/users");
    }, 100);
  }
  if (isError) console.log(error.data);

  return (
    <form
      onSubmit={handleSubmit}
      className="max max-w-5xl m-auto rounded border border-gray p-5"
    >
      {isError && error.data?.message && (
        <div className="py-2 px-4 w-full text-white bg-[#ff6363] rounded mb-3">
          {error.data.message}.
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={inputs?.firstname}
          onChange={(e) => setInputs({ ...inputs, firstname: e.target.value })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
        />
        <FromError isError={isError} error={error} field="firstname" />
      </div>
      <div className="mb-6">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={inputs?.lastname}
          onChange={(e) => setInputs({ ...inputs, lastname: e.target.value })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
        />
        <FromError isError={isError} error={error} field="lastname" />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputs?.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
        />
        <FromError isError={isError} error={error} field="email" />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={inputs?.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        <FromError isError={isError} error={error} field="password" />
      </div>
      <div className="mb-6">
        <label
          htmlFor="roles"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select The Role
        </label>
        <select
          id="roles"
          name="roles"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputs.roles[0]}
          onChange={(e) => setInputs({ ...inputs, roles: [e.target.value] })}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        <FromError isError={isError} error={error} field="roles" />
      </div>
      <div className="mb-6">
        <div className="flex items-start mb-1">
          <div className="flex items-center h-5">
            <input
              id="status1"
              type="radio"
              name="status"
              value="true"
              onChange={(e) =>
                setInputs({ ...inputs, active: !!e.target.value })
              }
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              defaultChecked={Boolean(inputs.active) && Boolean(true)}
            />
          </div>
          <label
            htmlFor="status1"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Active
          </label>
          <div className="flex items-center h-5 ml-2">
            <input
              id="status2"
              type="radio"
              name="status"
              value=""
              onChange={(e) =>
                setInputs({ ...inputs, active: !!e.target.value })
              }
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              defaultChecked={!Boolean(inputs.active) && Boolean(true)}
            />
          </div>
          <label
            htmlFor="status2"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Inactive
          </label>
        </div>
        <FromError isError={isError} error={error} field="active" />
      </div>
      <button
        type="submit"
        className="text-white bg-secondary hover:bg-secondaryDark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new user
      </button>
    </form>
  );
};

export default EditUserForm;
