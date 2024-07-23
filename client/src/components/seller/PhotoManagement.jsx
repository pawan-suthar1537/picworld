import DahsboardHeader from "../DahsboardHeader";
import ImageAdd from "../imageAdd";

const PhotoManagement = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <DahsboardHeader />
        <ImageAdd />
      </div>
    </div>
  );
};

export default PhotoManagement;
