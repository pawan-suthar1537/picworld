import axios from "axios";

const useUpload = async ({ image, uploadprogress }) => {
  const uploadImage = async () => {
    try {
      if (!image) {
        throw new Error("No image file provided");
      }

      const formData = new FormData();
      formData.append("file", image); // Use "file" instead of "image"
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: uploadprogress, // Use "onUploadProgress"
        withCredentials: false,
      };

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
        config
      );

      const data = res.data;
      if (!data) {
        console.log("No data returned from Cloudinary");
      }
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || error.message;
    }
  };

  const { public_id, secure_url } = await uploadImage();
  return { public_id, secure_url };
};

export default useUpload;
