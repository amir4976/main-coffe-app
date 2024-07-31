"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { Label } from "recharts";
import { ShowSwal } from "@/utils/Helpers";

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState([]);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [SubStateSelectedOption, setSubStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [discount, setDiscount] = useState('');
  const [DiscountValue, setDiscountValue] = useState(0);
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("Cart")) || [];
    setCart(localCart);
  }, []);



  const calcTotalPrice = () => {
    let totalPrice = 0;

    if (cart.length) {
      totalPrice = cart.reduce(
        (prev, current) => prev + current.price * current.count,  
        0
      );

    }
    // so if user have a discount code and discount value is not 0 then we will caluculate the discount and return the total price
    if(DiscountValue > 0){
      return totalPrice = totalPrice - (totalPrice * DiscountValue / 100)
    }
    // if its not then we will return the main total price
    return totalPrice;
  };

  const caluculateDiscount = async () => {
    // so we will check if the discount code is valid or not
    // if it is valid then we will caluculate the discount and return the total price but how ? 
    // we make a useState 
    const res = await fetch("/api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: discount,
      }),
    });
    if(res.status === 404){
      
      ShowSwal({title:"کد تخفیف وجود ندارد ",icon:"error",})

    }else if(res.status === 422){

      ShowSwal({title:"کد تخفیف منقضی شده است",icon:"error",})

    }else if(res.status === 200){
      // we get a discount persent from the response
      // and we setState the discount value
      // and then use it in calculateTotalPrice function

      const data = await res.json();
      const { persent } = data;
      setDiscountValue(persent)


      ShowSwal({title:"کد تخفیف اعمال شد",icon:"success",})
    }
  }

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={()=>caluculateDiscount()}>اعمال کوپن</button>
            <input type="text" value = {discount} onChange={e => setDiscount(e.target.value)} placeholder="کد تخفیف" />
          </div>
        </section>
      </div>
      
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateSelectedOption?.value}
            />

        
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{calcTotalPrice().toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
