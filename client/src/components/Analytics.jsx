import { useLocation } from "react-router-dom";
import DahsboardHeader from "./DahsboardHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ExpenseCards from "./ExpenseCards";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Analytics = () => {
  const [tillnow, setTillNow] = useState([]);
  const [thisyear, setThisYear] = useState([]);
  const [thisweek, setThisWeek] = useState([]);
  const [thismonth, setThisMonth] = useState([]);

  const { pathname } = useLocation();

  const getpostsbydaterange = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "/api/postbyrange",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { data } = res.data;
      console.log("data from analytics", data);
      setTillNow(data.tillNow);
      setThisYear(data.thisYear);
      setThisWeek(data.thisWeek);
      setThisMonth(data.thisMonth);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    getpostsbydaterange();
  }, []);

  const calculateTotalforseller = (data) => {
    const value = data.reduce((accumulator, currentValue) => {
      const price = currentValue.price || 0;
      const purchases = currentValue.purchasedBy
        ? currentValue.purchasedBy.length
        : 0;
      return accumulator + price * purchases;
    }, 0);
    return value;
  };

  const calculateTotalforbuyer = (data) => {
    const value = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    return value;
  };

  return (
    <div>
      <DahsboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Analytics page</h1>
      <h2 className="text-2xl font-semibold mb-5 ml-8">
        {pathname === "/seller/profile" ? "Uploaded" : "Purchased"} this Year
      </h2>
      <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bgwhite rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            margin={{
              top: 20,
              left: -61,
              bottom: -50,
            }}
            data={thisyear}
          >
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <p>
          Total {pathname == "/seller/profile" ? "Earned" : "Spend"} : $
          {pathname === "/seller/profile"
            ? calculateTotalforseller(thisyear)
            : calculateTotalforbuyer(thisyear)}{" "}
        </p>
      </div>

      {!thismonth.length ? (
        <h1 className="text-2xl font-semibold my-5 ml-8">No data Available</h1>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-10">
          <ExpenseCards
            data={thisweek}
            title={`${
              pathname === "/seller/profile" ? "Earned" : "Spent"
            } this year`}
            datakey="price"
            value={
              pathname === "/seller/profile"
                ? calculateTotalforseller(thisweek)
                : calculateTotalforbuyer(thisweek)
            }
          />
          <ExpenseCards
            data={thismonth}
            title={`${
              pathname === "/seller/profile" ? "Earned" : "Spent"
            } this month`}
            datakey="price"
            value={
              pathname === "/seller/profile"
                ? calculateTotalforseller(thismonth)
                : calculateTotalforbuyer(thismonth)
            }
          />
          <ExpenseCards
            data={tillnow}
            title={`${
              pathname === "/seller/profile" ? "Earned" : "Spent"
            } till now`}
            datakey="price"
            value={
              pathname === "/seller/profile"
                ? calculateTotalforseller(tillnow)
                : calculateTotalforbuyer(tillnow)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Analytics;
