import { useSelector } from "react-redux";
import Analytics from "../components/Analytics";
import DashboardSidebar from "../components/DashboardSidebar";
import Orders from "../components/Orders";
import PhotoManagement from "../components/seller/PhotoManagement";
import Favorites from "../components/Favorites";
import Photospurchase from "../components/buyer/Photospurchase";

const BuyerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div>
        {(() => {
          switch (tab) {
            case "Photos-purchase":
              return <Photospurchase />;
            case "Analytics":
              return <Analytics />;
            case "Orders":
              return <Orders />;
            case "Favorites":
              return <Favorites />;
            default:
              return <Photospurchase />;
          }
        })()}
      </div>
    </div>
  );
};

export default BuyerDashboard;
