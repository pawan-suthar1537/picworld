import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setmypost } from "../../../store/slices/postslice";
import DahsboardHeader from "../DahsboardHeader";
import Imagecard from "../Imagecard";
import { IoArrowDownCircle } from "react-icons/io5";

const Photospurchase = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.mypost);
  const tab = useSelector((state) => state.nav.tab);

  const getmyposts = async () => {
    try {
      if (posts.length > 0) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/image/myposts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res.data;
      dispatch(setmypost(data));
    } catch (error) {
      console.log("");
    }
  };

  useEffect(() => {
    getmyposts();
  }, []);

  const downloadimg = async (img, title) => {
    try {
      const res = await fetch(img);
      if (!res.ok) {
        toast.error(res.statusText);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(error.message || "Failed to download image");
    }
  };

  return (
    <div>
      <DahsboardHeader />
      <div className="mx-8 grid md:grid-cols-1 lg:grid-cols-4 gap-4">
        {posts?.map(({ id, title, posturl, user, price }) => (
          <Imagecard
            key={posturl}
            title={title}
            img={posturl}
            author={user}
            price={price}
            id={id}
            ic1={
              <IoArrowDownCircle
                title="Download"
                className="text-2xl text-red-400 cursor-pointer hover:scale-105 transition-all ease-linear duration-300"
                onClick={() => downloadimg(posturl, title)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Photospurchase;
