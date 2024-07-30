import DashboardSidebar from "../components/DashboardSidebar";
import Orders from "../components/Orders";

const SellerDashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div></div>
      {/* <PhotoManagement /> */}
      {/* <Analytics /> */}
      <Orders />
    </div>
  );
};

export default SellerDashboard;
