import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Imagecard from "./Imagecard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setallposts } from "../../store/slices/postslice";
import { useEffect, useState } from "react";

const PhotoGallery = () => {
  const posts = useSelector((state) => state.post.allposts);
  const isauth = useSelector((state) => state.auth.isauth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const getAllImages = async () => {
    if (posts.length > 0) return;
    try {
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "api/image/all"
      );
      const { data } = await res;
      dispatch(setallposts(data.posts));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  //     return;
  //   }
  //   try {
  //     const res = await axios.post(
  //       import.meta.env.VITE_APP_URL + "/api/payment",
  //       { price },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     const { data } = res.data;
  //     console.log("Payment data:", data);
  //     verifyPurchase(data, id, posturl, user, title, price);
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     toast.error(error.response?.data?.message || "Failed to process payment");
  //   }
  // };

  // const verifyPurchase = async (data, id, posturl, user, title, price) => {
  //   console.log("Initializing Razorpay with data:", data);
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY,
  //     amount: data.amount,
  //     currency: data.currency,
  //     name: "Your Company Name",
  //     order_id: data.id,
  //     handler: async (response) => {
  //       console.log("Razorpay response:", response);
  //       try {
  //         const res = await axios.post(
  //           import.meta.env.VITE_APP_URL + "/api/verify",
  //           {
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_signature: response.razorpay_signature,
  //             postid: id,
  //             posturl,
  //             user,
  //             title,
  //             price,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //               "Content-Type": "application/json",
  //             },
  //             withCredentials: true,
  //           }
  //         );
  //         const { data } = res;
  //         console.log("Verify data:", data);
  //         toast.success(data.message);
  //       } catch (error) {
  //         console.error("Error verifying purchase:", error);
  //         toast.error(
  //           error.response?.data?.message || "Failed to verify purchase"
  //         );
  //       }
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  const purchaseImages = async (price, id, posturl, user, title) => {
    if (!isauth) {
      toast.error("Please login to buy this post");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_APP_URL + "api/payment",
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

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your actual key
        amount: data.amount,
        currency: data.currency,
        name: "picworld",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              import.meta.env.VITE_APP_URL + "api/verify",
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
            const { data } = verifyRes;
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
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.response?.data?.message || "Failed to process payment");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/myfavorites`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { favorites } = res.data.data;
      // Use the IDs of favorites to set the state
      setFavorites(favorites.map((favorite) => favorite._id));
    } catch (error) {
      if (error.response?.status === 404) {
        setFavorites([]);
      } else {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  const toggleFavorite = async (id) => {
    if (!isauth) {
      toast.error("Please login to manage favorites");
      navigate("/login");
      return;
    }

    try {
      if (favorites.includes(id)) {
        await axios.post(
          `${import.meta.env.VITE_APP_URL}api/image/removefromfavorite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFavorites(favorites.filter((favorite) => favorite !== id));
        toast.success("Removed from favorites");
      } else {
        await axios.put(
          `${import.meta.env.VITE_APP_URL}api/image/addtofavorite/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFavorites([...favorites, id]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle favorite");
    }
  };

  useEffect(() => {
    getAllImages();
    fetchFavorites();
  }, [dispatch]);

  return (
    <div className="my-8 bg-white flex flex-col justify-center items-center">
      <h3 className="text-[50px] font-semibold mb-5">All Photos</h3>
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
              ic1={
                <FaHeart
                  onClick={() => toggleFavorite(_id)}
                  color={favorites.includes(_id) ? "red" : ""}
                />
              }
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
