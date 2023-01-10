import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/loginApiSlice";
import { useSelector } from "react-redux";
import FromError from "../../../components/helpers/FromError";
import Loader from "../../../components/ui/Loader";
import { selectCurrentToken, setCredentials } from "../redux/loginSlice";
import { useNavigate, Navigate } from "react-router-dom";
import usePersist from "../hooks/usePersist";

const Login = () => {
  //const token = useSelector(selectCurrentToken);
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  //if (token) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (data?.accessToken) dispatch(setCredentials(data.accessToken));
  };

  if (isError) console.log(error.data);
  if (!isLoading && isSuccess)
    setTimeout(() => {
      navigate("/");
    }, 100);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[400px] sm:w-[500px] h-[530px] px-5 sm:px-10 py-12 border border-[#dddddd] rounded">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!isLoading && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">Bizen</h1>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              {isError && error.data.message && (
                <div className="py-2 px-4 w-full text-white bg-[#ff6363] rounded mb-3">
                  {error.data.message}.
                </div>
              )}
              <label htmlFor="email" className="mb-2 font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="border border-gray rounded py-2 px-3"
                placeholder="Email"
              />
              <FromError isError={isError} error={error} field="email" />
              <label htmlFor="password" className="mb-2 font-medium mt-6">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-gray rounded py-2 px-3"
              />
              <FromError isError={isError} error={error} field="password" />
              <div className="mb-6 mt-6">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                  checked={persist}
                  onChange={() => setPersist(!persist)}
                />
                <label htmlFor="remember" className="mb-2 font-medium">
                  Remeber me
                </label>
              </div>
              <button className="bg-secondary py-3 rounded text-white font-medium">
                Login
              </button>
              <div className="mt-5">
                <div className="mb-1">
                  <span className="font-bold">Email: </span> test@gmail.com
                </div>
                <div>
                  <span className="font-bold">Password: </span> 123456
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
