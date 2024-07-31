import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Imagecard from "./Imagecard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import DahsboardHeader from "./DahsboardHeader";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const isauth = useSelector((state) => state.auth.isauth);
  const navigate = useNavigate();
  const [favoritePostIds, setFavoritePostIds] = useState(new Set());

  const { pathname } = useLocation();

  const fetchFavorites = async () => {
    if (!isauth) {
      toast.error("Please login to view favorites");
      return;
    }
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

      const usernameMap = res.data.data.uploadedby.reduce((acc, post) => {
        acc[post._id] = post.user.username;
        return acc;
      }, {});

      const favoritesWithUsernames = res.data.data.favorites.map(
        (favorite) => ({
          ...favorite,
          username: usernameMap[favorite._id] || "Unknown",
        })
      );

      setFavorites(favoritesWithUsernames);
      setFavoritePostIds(
        new Set(favoritesWithUsernames.map((post) => post._id))
      );
    } catch (error) {
      if (error.response?.status === 404) {
        setFavorites([]);
      } else {
        console.error("Error fetching favorites:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    if (!isauth) {
      toast.error("Please login to manage favorites");
      navigate("/login");
      return;
    }

    try {
      if (favoritePostIds.has(id)) {
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
        setFavoritePostIds((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(id);
          return newFavorites;
        });
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
        setFavoritePostIds((prev) => new Set(prev).add(id));
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle favorite");
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
  useEffect(() => {
    fetchFavorites();
  }, [isauth]);

  return (
    <div>
      <DahsboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Favorites page</h1>
      <div className="my-8 bg-white flex flex-col justify-center items-center">
        {loading ? (
          <p className="text-xl">Loading...</p>
        ) : favorites.length === 0 ? (
          <p className="text-2xl font-semibold mb-5 ml-8">
            No favorite images found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:m-5 p-5 mx-auto lg:grid-cols-5 gap-5">
            {favorites.map(({ _id, title, image, price, username }) => (
              <div key={_id} className="relative">
                <Imagecard
                  author={username}
                  id={_id}
                  title={title}
                  img={image}
                  price={price}
                  ic1={
                    <FaHeart
                      onClick={() => toggleFavorite(_id)}
                      size={18}
                      color={favoritePostIds.has(_id) ? "red" : ""}
                      className="cursor-pointer"
                    />
                  }
                  ic2={
                    pathname === "/buyer/profile" && (
                      <FaShoppingCart
                        title="cart"
                        onClick={() =>
                          purchaseImages(price, _id, image, username, title)
                        }
                        size={18}
                        className="cursor-pointer"
                      />
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
