import axios from "axios";

const UseUpload = async ({ image, uploadprogress }) => {
  const uploadimage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        uploadprogress,
        withCredentials: false,
      };

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
        config
      );

      const data = await res.data;
      if (!data) {
        console.log("no data");
      }
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  };

  const { public_id, secure_url } = await uploadimage();
  return { public_id, secure_url };
};

export default UseUpload;
