import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";

const BuyerDashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div></div>
      {/* <PhotoManagement /> */}
    </div>
  );
};

export default BuyerDashboard;
