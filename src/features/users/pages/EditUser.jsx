import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../redux/api/usersApiSlice";
import FromError from "../../../components/helpers/FromError";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import { useUpdateUserMutation } from "../redux/api/usersApiSlice";
import { notify } from "../../../util/toast";
import EditUserForm from "../components/EditUserForm";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetUsersQuery({ search: "" });
  const user = data?.entities[id];

  if (!user) return;
  return (
    <div className="py-8 px-2 lg:px-8">
      <Breadcrumb title="Edit User" />

      <div className="px-2 lg:px-8">
        <EditUserForm user={user} />
      </div>
    </div>
  );
};

export default EditUser;
