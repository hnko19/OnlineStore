import axios from 'axios'
import { Bounce, toast } from "react-toastify";

export async function removeProductFromWishlist(wishlistId , token) {
    axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+ wishlistId, {
      headers: {
          "token": token
      }
    }).then(({data})=> {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
    })
}