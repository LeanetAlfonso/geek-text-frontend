import "./Book.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { addToCart } from "../../Redux/actions/cartActions";
import Notification from "./UI/Notification";
import Rating from '@material-ui/lab/Rating';

const Book = ({ cover, description, price, title, bookId, authorName, rating, authorId }) => {

  const dispatch = useDispatch();

  // Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  // Add a new item to cart
  const addToCartNew = () => {
    dispatch(addToCart(bookId, Number(1), false));
    setNotify({
      isOpen: true,
      message: `"${title}" was added to cart`,
      type: 'success',
      typeStyle: 'specific'
    });
  };


  // Add an item that already exists in cart (increment by 1)
  const addToCartExistent = (currQty) => {
    dispatch(addToCart(bookId, Number(currQty) + Number(1), false));
    setNotify({
      isOpen: true,
      message: `"${title} (x${Number(currQty) + Number(1)}) was added to cart`,
      type: 'success',
      typeStyle: 'specific'
    });
  };

  // Determine whether item is already existent in cart and handle add operation accordingly
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = () => {
    (cartItems.some(item => item.book === bookId)) ?
      addToCartExistent(cartItems.find((item) => item.book === bookId).qty)
      :
      addToCartNew();
  };


  return (
    <>
      <div className="product">
        <div className="center__image">
          <img src={cover} alt={title} />
        </div>
        <div className="product__info">

          <Link to={`/book/${bookId}`} className="cartItem__name">
            <p className="info__name">{title}</p>
          </Link>
          <p className="info__author">By <Link to={`/authorbooks/${authorId}`} className="book__author__link">{authorName}</Link></p>

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <div className="rating__block">
            <div className="book__rating__stars">
              < Rating
                name="half-rating-read"
                value={rating}
                precision={0.1}
                readOnly
                size="small"
              />
            </div>
            <div className="book__rating">{parseFloat(rating).toFixed(1)}</div>
          </div>
          <div className="info__description">{description}</div>
          <p className="info__price">${parseFloat(price).toFixed(2)}</p>
        </div>
        <div className="browser_buttons">
          <Link to={`/book/${bookId}`} className="info__button">
            Details
          </Link>
          <button type="info__button" onClick={addToCartHandler}>
            <AddShoppingCartIcon fontSize="small" />
          </button>
        </div>
      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  );
};

export default Book;