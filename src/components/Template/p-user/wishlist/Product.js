"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";
import { CiStar } from "react-icons/ci";
const Card = ({data}) => {
  const { name, score, price } = data.product;

  const removeProduct = (productId) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
     if(result){
      const DeleteFromWishList = fetch(`/api/WishList/${productId}`, {
        method: 'DELETE',
      })
      if(DeleteFromWishList.status === 200){
        swal("محصول مورد نظر با موفقیت حذف شد", {
          icon: "success",
        });
      }
     }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/product/123"}>
        <img
          width={283}
          height={283}
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt=""
        />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <IoMdStar key={index} />
          ))}
          {new Array(5-score).fill(0).map((item, index) => (
            <CiStar key={index} />
          ))}
        </div>
        <span>{price.toLocaleString()} تومان</span>
      </div>
      <button onClick={() => removeProduct(data._id)} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
