"use client"
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/Template/cart/Table";
import styles from "@/styles/cart.module.css";
import Link from "next/link";
import { useEffect ,useState} from "react";
import { TbShoppingCartX } from "react-icons/tb";

/**
 * Renders the Cart page component, which displays the user's shopping cart and allows them to proceed to checkout.
 * 
 * The component retrieves the cart items from localStorage, and renders either the cart table or a message indicating an empty cart.
 * The Navbar, Stepper, and Footer components are also rendered.
 */
const Page = () => {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    const localCart = JSON.parse(localStorage.getItem("Cart")) || [];
    setCart(localCart);
  },[])

  return (
    <>
      <Navbar />
      <Stepper step="cart" />
            {
              cart.length ? (
              <main className={styles.cart} data-aos="fade-up">
                <Table />
              </main> ):(
                <div class={styles.cart_empty} data-aos="fade-up">
                <TbShoppingCartX />
                <p>سبد خرید شما در حال حاضر خالی است. </p>
                <span>قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.</span>
                <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
                <div>
                    <Link href='/category'>بازگشت به فروشگاه</Link>
                </div>
            </div> 
              )
            }
      <Footer />
    </>
  );
};

export default Page;
