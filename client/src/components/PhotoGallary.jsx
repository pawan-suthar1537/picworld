import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Imagecard from "./Imagecard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setallposts } from "../../store/slices/postslice";
import { useEffect } from "react";

const PhotoGallery = () => {
  const posts = useSelector((state) => state.post.allposts);
  const isauth = useSelector((state) => state.auth.isauth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllImages = async () => {
    if (posts.length > 0) return;
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "/api/image/all"
      );
      const { data } = await res;
      dispatch(setallposts(data.posts));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  const purchaseImages = async (price, id, posturl, user, title) => {
    if (!isauth) {
      toast.error("Please login to buy this post");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_APP_URL + "/api/payment",
        { price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { data } = res.data;
      console.log("Payment data:", data);
      await verifyPurchase(data, id, posturl, user, title, price);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.response?.data?.message || "Failed to process payment");
    }
  };

  const verifyPurchase = async (data, id, posturl, user, title, price) => {
    console.log("Initializing Razorpay with data:", data);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Your Company Name",
      order_id: data.id,
      handler: async (response) => {
        console.log("Razorpay response:", response);
        try {
          const res = await axios.post(
            import.meta.env.VITE_APP_URL + "/api/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postid: id,
              posturl,
              user,
              title,
              price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          const { data } = res;
          console.log("Verify data:", data);
          toast.success(data.message);
        } catch (error) {
          console.error("Error verifying purchase:", error);
          toast.error(
            error.response?.data?.message || "Failed to verify purchase"
          );
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="my-8 bg-white flex flex-col justify-center items-center">
      <h3 className="text-[50px] font-semibold mb-5">Photos</h3>
      {posts.length === 0 ? (
        <p className="text-xl">No images found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:m-5 p-5 mx-auto lg:grid-cols-5 gap-5">
          {posts.map(({ _id, title, image, price, user }) => (
            <Imagecard
              key={_id}
              author={user.username}
              id={_id}
              title={title}
              img={image}
              price={price}
              ic1={<FaHeart />}
              ic2={
                <FaShoppingCart
                  title="cart"
                  onClick={() =>
                    purchaseImages(price, _id, image, user.username, title)
                  }
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
