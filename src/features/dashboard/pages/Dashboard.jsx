import {
  HiUsers,
  HiCube,
  HiCurrencyDollar,
  HiShoppingBag,
} from "react-icons/hi2";
import { useCountsQuery } from "../redux/api/dashboardApiSlice";
import Loader from "../../../components/ui/Loader";

const Dashboard = () => {
  const { data: counts, isLoading, isSuccess } = useCountsQuery();
  if (isSuccess) console.log(counts);
  return (
    <div className="py-8 px-2 lg:px-8">
      {isLoading && <Loader center={true} />}
      {isSuccess && (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-[#dddddd]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#218be7] to-[#3ca0f3] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <HiUsers className="h-6 w-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Users
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {counts.totalUsers}
              </h4>
            </div>
            <div className="border-t border-[#dddddd] p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-[#4caf50]">+55%</strong>&nbsp;than last
                week
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-[#dddddd]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#da1f63] to-[#ea3c77] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <HiCube className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Products
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {counts.totalProducts}
              </h4>
            </div>
            <div className="border-t border-[#dddddd] p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-[#4caf50]">+55%</strong>&nbsp;than last
                week
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-[#dddddd]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#46a24a] to-[#63b967] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <HiCurrencyDollar className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Income
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                $53,200k
              </h4>
            </div>
            <div className="border-t border-[#dddddd] p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-[#4caf50]">+55%</strong>&nbsp;than last
                week
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-[#dddddd]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#fb8e03] to-[#fea423] text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <HiShoppingBag className="w-6 h-6" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Sales
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                253
              </h4>
            </div>
            <div className="border-t border-[#dddddd] p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-[#4caf50]">+55%</strong>&nbsp;than last
                week
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
