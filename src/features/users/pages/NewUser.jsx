import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FromError from "../../../components/helpers/FromError";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import { useAddUserMutation } from "../redux/api/usersApiSlice";
import { notify } from "../../../util/toast";

export const NewUser = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation();
  const handleSubmit = (e) => {
    e.preventDefault();

    addUser({
      firstname: e.target.firstName.value,
      lastname: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      roles: [e.target.roles.value],
    });
  };
  useEffect(() => {
    if (isSuccess && !isError) {
      notify("success", "User Added Successfully");
      navigate("/users");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="py-8 px-2 lg:px-8">
      <Breadcrumb title="New User" />

      <div className="px-2 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="max max-w-5xl m-auto rounded border border-gray p-5"
        >
          {isError && error.data.message && (
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <FromError isError={isError} error={error} field="password" />
          </div>
          <div className="mb-6">
            <label
              htmlFor="roles"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your country
            </label>
            <select
              id="roles"
              name="roles"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <FromError isError={isError} error={error} field="roles" />
          </div>
          <button
            type="submit"
            className="text-white bg-secondary hover:bg-secondaryDark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new user
          </button>
        </form>
      </div>
    </div>
  );
};
