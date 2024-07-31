import axios from "axios";
import { useDispatch } from "react-redux";
import { setallposts } from "../../store/slices/postslice";
import toast from "react-hot-toast";

const HeroSection = () => {
  const dispatch = useDispatch();
  const handleserch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + `/api/image/search?serch=${search}`
      );
      const { data } = await res;
      dispatch(setallposts(data.posts || []));
    } catch (error) {
      toast.error("");
    }
  };

  return (
    <div className="sm:w-[60vw] h-[15vh] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
      <form className="absolute flex justify-center items-center">
        <input
          type="search"
          placeholder="Search..."
          id="search"
          className="py-5 px-2 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none border-b-2"
          onChange={handleserch}
        />
      </form>
    </div>
  );
};

export default HeroSection;
