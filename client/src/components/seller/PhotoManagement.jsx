import { useDispatch, useSelector } from "react-redux";
import DahsboardHeader from "../DahsboardHeader";
import ImageAdd from "../imageAdd";
import toast from "react-hot-toast";
import axios from "axios";
import { setmypost } from "../../../store/slices/postslice";
import { useEffect } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Imagecard from "../Imagecard";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.post.mypost);
  const username = useSelector((state) => state.auth.user.username);

  const dispatch = useDispatch();

  const getmyposts = async () => {
    try {
      if (posts.length > 0) {
        return;
      }
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "/api/image/myposts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = res;
      console.log(data.data); // Corrected from data.data to data
      dispatch(setmypost(data.data)); // Adjust according to your action's payload);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    getmyposts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <DahsboardHeader />
        <ImageAdd />
      </div>
      {/* map all posts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 bg-transparent sm:bg-white p-5 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll  rounded-lg mx-auto  sm:mx-0">
        {posts.map(({ _id, title, image, price }) => {
          return (
            <Imagecard
              key={_id}
              title={title}
              img={image}
              price={price}
              author={username}
              id={_id}
              ic1={
                <BiSolidMessageSquareEdit
                  title="Edit"
                  className="text-3xl text-black cursor-pointer hover:scale-105 transition-all ease-linear duration-300"
                />
              }
              ic2={
                <MdDelete
                  title="Delete"
                  className="text-3xl text-red-500 cursor-pointer hover:scale-105 transition-all ease-linear duration-300"
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoManagement;
