import { FC } from "react";
import { CartItem } from "../models/CartItem";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { useAppDispatch } from "../redux/hooks";
import { addToCart, reduceFromCart, removeFromCart } from "../redux/features/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDiscount from "../hooks/useDiscount";

const CartRow: FC<CartItem> = ({
  _id,
  image,
  title,
  price,
  quantity,
  rating,
  category,
  discountPercentage = 0,
}) => {
  const dispatch = useAppDispatch();
  const result = useDiscount({ price, discount: discountPercentage });

  const handleRemoveFromCart = () => {
    console.log("Removing product with ID:", _id); // Debug log
    dispatch(removeFromCart(_id)); // Ensure _id is a string
  };

  return (
    <div className="grid grid-cols-7 gap-3 border items-center">
      <img src={image} alt="image" className="h-20 col-span-2" />
      <div className="col-span-3">
        <h3 className="font-bold leading-4">{title}</h3>
        <div className="flex space-x-2 items-center">
          <h3 className="font-semibold">${result.toFixed(2)}</h3>
          {discountPercentage !== 0 && (
            <span className="text-xs">-{discountPercentage}%</span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <IoIosRemoveCircleOutline
            className="cursor-pointer hover:opacity-80"
            onClick={() => dispatch(reduceFromCart(_id))}
            data-test="cart-reduce-btn"
          />
          <span data-test="cart-item-quantity">{quantity}</span>
          <IoIosAddCircleOutline
            className="cursor-pointer hover:opacity-80"
            data-test="cart-increase-btn"
            onClick={() =>
              dispatch(
                addToCart({
                  _id,
                  title,
                  price,
                  quantity: 1,
                  image,
                  rating,
                  category,
                })
              )
            }
          />
        </div>
      </div>
      <div className="font-bold col-span-2">
        {quantity && (
          <span data-test="cart-item-price">
            ${(result * quantity).toFixed(2)}
          </span>
        )}
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer text-2xl hover:text-red-600"
          onClick={handleRemoveFromCart}
          data-test="cart-remove-btn"
        />
      </div>
    </div>
  );
};

export default CartRow;
