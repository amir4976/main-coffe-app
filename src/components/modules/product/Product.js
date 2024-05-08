import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ product }) => {
  console.log(product)
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          alt=""
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${product._id}`}>
          <p className={styles.title}>{product.name}</p>
        </Link>
        <div>
          {
            new Array(product.score).fill(0).map((index,item) => (
              <FaStar key={index} />
            ))
          }
          {
            new Array(5-product.score).fill(0).map((index,item) => (
              <FaRegStar key={index} />
            ))
          }
          
        </div>
        <span>{product.price.toLocaleString('fa-ir')} تومان</span>
      </div>
    </div>
  );
};

export default Card;
