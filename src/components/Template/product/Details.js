"use client"
import { FaFacebookF, FaStar, FaTwitter, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import { IoMdHeart } from "react-icons/io";
import AddToWishList from "./AddToWishList";
import { useState } from "react";


const Details = ({ product, isInwishList ,user}) => {
const [ count ,setCount] = useState(1);

// add to cart using localhost 
const AddToCart = () => {
  const Cart = JSON.parse(localStorage.getItem("Cart")) || [];
  const isInCart = Cart.some((cart)=> product._id === cart.id);
  if(isInCart){
    Cart.forEach(item => {
        if(item.id === product._id){
          item.count = item.count + count;
        }
    });
    localStorage.setItem("Cart", JSON.stringify(Cart));
    alert("محصول با موفقیت به سبد خرید شما اضافه شد")
  }else{
    Cart.push({
      id: product._id,
      name: product.name,
      price: product.price,  
      image: product.image,
      count,
    });
    localStorage.setItem("Cart", JSON.stringify(Cart));
    alert("محصول با موفقیت به سبد خرید شما اضافه شد")
  }

}

  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={product.name} />
      <h2>{product.name}</h2>

      <div className={styles.rating}>
        <div>
          {new Array(product.score).fill(0).map((index, item) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - product.score).fill(0).map((index, item) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <p>{`بر اساس ${product.comments.length} دیدگاه`}</p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product.shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button onClick={()=>AddToCart()}>افزودن به سبد خرید</button>
        <div>
          <span onClick={()=>setCount(count<1 ? 1:1)}>-</span>
          {count}
          <span onClick={()=>setCount(count+1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
            <AddToWishList productId={product._id} />
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong> کد رهگیری: {product._id} </strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong>
          {product.Tags.join(", ")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
