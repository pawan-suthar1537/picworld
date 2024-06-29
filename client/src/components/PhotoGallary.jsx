import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Imagecard from "./Imagecard";

const PhotoGallary = () => {
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
      <h3 className="text-[50px] font-semibold mb-5">Photos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-20">
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
        <Imagecard
          title={"Nature"}
          author={"pawan"}
          img={
            "https://images.pexels.com/photos/20147077/pexels-photo-20147077/free-photo-of-lenses-of-sparkles.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          price={1200}
          ic1={
            <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
          ic2={
            <FaHeart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
          }
        />
      </div>
    </div>
  );
};

export default PhotoGallary;
