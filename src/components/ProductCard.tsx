import { FC } from "react";
import RatingStar from "./RatingStar";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PriceSection from "./PriceSection";
import useAuth from "../hooks/useAuth";

interface ProductCardProps {
  _id: string;
  price: number;
  image: string;
  title: string;
  category: string;
  rating?: number;
  name: string;
  discountPercentage?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  price,
  name,
  image,
  title,
  category,
  rating = 0,
  discountPercentage,
}) => {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuth();

  const addCart = () => {
    requireAuth(() => {
      dispatch(
        addToCart({
          _id,
          price,
          name,
          title,
          category,
          rating,
          image,
          discountPercentage,
        })
      );
      toast.success("Item added to cart successfully", {
        duration: 3000,
      });
    });
  };

  return (
    <div className="border border-gray-200 font-lato" data-test="product-card">
      <div className="text-center border-b border-gray-200">
        <Link to={{ pathname: `/product/${_id}` }}>
          <img
            src={image}
            alt={title}
            className="inline-block h-60 transition-transform duration-200 hover:scale-110"
          />
        </Link>
      </div>
      <div className="px-8 pt-4">
        <p className="text-gray-500 text-[14px] font-medium dark:text-white">
          {name}
        </p>
        <Link
          className="font-semibold hover:underline dark:text-white"
          to={{ pathname: `/product/${_id}` }}
        >
          {title}
        </Link>
      </div>
      <div className="px-8">
        <RatingStar rating={rating} />
      </div>
      <div className="flex items-center justify-between px-8 pb-4">
        {discountPercentage && (
          <PriceSection discountPercentage={discountPercentage} price={price} />
        )}
        <button
          type="button"
          className="flex items-center space-x-2 hover:bg-blue-500 text-white py-2 px-4 rounded bg-pink-500"
          onClick={addCart}
          data-test="add-cart-btn"
        >
          <AiOutlineShoppingCart />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;