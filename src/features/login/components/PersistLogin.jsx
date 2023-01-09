import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import usePersist from "../hooks/usePersist";
import { selectCurrentToken } from "../redux/loginSlice";
import {
  useLogoutMutation,
  useRefreshMutation,
} from "../redux/api/loginApiSlice";
import Loader from "../../../components/ui/Loader";

const PersistLogin = () => {
  const navigate = useNavigate();
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (
      effectRan.current === true /* || process.env.NODE_ENV !== "development"*/
    ) {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
      else if (!token && !persist) logout();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  if (logoutSuccess)
    setTimeout(() => {
      navigate("/login");
    }, 100);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content = <Loader center={true} />;
  } else if (isError) {
    setTimeout(() => {
      navigate("/login");
    }, 100);
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
