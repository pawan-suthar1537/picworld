import { useState } from "react";
import toast from "react-hot-toast";
import UseUpload from "../../hooks/useUpload";
import axios from "axios";
import { useSelector } from "react-redux";

import Progressbar from "@ramonak/react-progress-bar";

const ImageAdd = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.auth.user);

  const handleImageChange = (e) => {
    const fileTypesAllowed = ["image/jpeg", "image/png", "image/jpg"];
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!fileTypesAllowed.includes(file.type)) {
      toast.warn("File type not allowed. Please use JPEG, PNG, or JPG.");
      return;
    }

    const maxSizeInBytes = 10000000; // 1MB
    if (file.size > maxSizeInBytes) {
      toast.warn("File size is too large. Maximum size is 1MB.");
      return;
    }

    setProgress(0);
    setImage(file);
    toast.success("Image selected successfully.");
  };

  const uploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };

  const addpost = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.title.value;
      const price = e.target.price.value;

      if (!title || !price) {
        return toast.error("Please fill all the fields to add image");
      }

      if (title.trim() === "" || title.trim() === " ") {
        return toast.error("Title is required with some name");
      }

      const { public_id, secure_url } = await UseUpload({
        image,
        uploadProgress,
      });
      if (!public_id || !secure_url) {
        return toast.error("Image not uploaded");
      }

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/image/upload`,
        {
          title,
          price,
          user,
          image: secure_url,
          public_id: public_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.data;
      if (!data) {
        return toast.error("Image not added");
      }
      if (data) {
        toast.success("Image added successfully");
        setImage(null);
        setProgress(0);

        e.target.reset();
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-5 bg-white mx-9 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold">Add new Image</h2>
      <form className="grid grid-cols-1 gap-2 my-4" onSubmit={addpost}>
        <img
          src={`${
            image
              ? URL.createObjectURL(image)
              : "https://dummyimage.com/600x400/000/fff&text=no+image+"
          }`}
          alt=""
          className="w-[320px] h-[25vh] sm:h-[30vh] rounded-lg object-cover"
        />
        {/* progress bar */}
        {progress > 0 && (
          <Progressbar
            completed={progress}
            bgColor="#000"
            baseBgColor="#fff"
            animateOnRender
            transitionTimingFunction="ease-in-out"
            height="10px"
            width="100%"
            className="mt-3"
          />
        )}
        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold">
            Image
          </label>
          <input
            required
            onChange={handleImageChange}
            type="file"
            name="image"
            id="image"
            className="rounded-lg border outline-none px-3 py-1 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            id="title"
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="title"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="Price"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-3 bg-black font-semibold text-white rounded-lg mt-2"
        >
          add image
        </button>
      </form>
    </div>
  );
};

export default ImageAdd;
