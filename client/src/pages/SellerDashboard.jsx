import { useSelector } from "react-redux";
import Analytics from "../components/Analytics";
import DashboardSidebar from "../components/DashboardSidebar";
import Orders from "../components/Orders";
import PhotoManagement from "../components/seller/PhotoManagement";
import Favorites from "../components/Favorites";

const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div>
        {(() => {
          switch (tab) {
            case "Photo-management":
              return <PhotoManagement />;
            case "Analytics":
              return <Analytics />;
            case "Orders":
              return <Orders />;
            case "Favorites":
              return <Favorites />;
            // case "Orders":
            //   return <Orders />;
            default:
              return <PhotoManagement />;
          }
        })()}
      </div>
    </div>
  );
};

export default SellerDashboard;
