import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setorder } from "../../store/slices/orderslice";
import { useEffect } from "react";
import DahsboardHeader from "./DahsboardHeader";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const role = useSelector((state) => state.auth.accounttype);
  const getOrders = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "/api/orders/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data } = res.data;
      console.log("Orders:", data);
      dispatch(setorder(data));
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      throw error;
    }
  };

  const convertodate = (date) => date.split("T")[0];

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <DahsboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Orders</h1>
      <div className="overfloww-x-auto sm:ml-8">
        <table className="w-full sm:w-[80vw] bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">item</th>
              <th className="py-3 px-6 text-left">
                {role === "seller" ? "Purchaser" : "Owner"} Name
              </th>
              <th className="py-3 px-6 text-left">date</th>
              <th className="py-3 px-6 text-left">price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders?.map((ord) => (
              <tr
                key={ord.razorpayorderid}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{ord.razorpayorderid}</td>
                <td className="py-3 px-6 text-left">{ord.title}</td>
                <td className="py-3 px-6 text-left">
                  {role === "buyer"
                    ? ord.user.charAt(0).toUpperCase() + ord.user.slice(1)
                    : ord.purchasername.charAt(0).toUpperCase() +
                      ord.purchasername.slice(1)}
                </td>
                <td className="py-3 px-6 text-left">
                  {convertodate(ord.createdAt)}
                </td>
                <td className="py-3 px-6 text-right">{ord.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
