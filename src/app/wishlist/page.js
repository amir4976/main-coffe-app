import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/Product";
import styles from "@/styles/wishlist.module.css";
import { authUser } from "@/utils/AuthUser";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import ConnectToDb from "../../../configs/db";
import wishModel from "../../../models/WishList";
const page = async () => {
  ConnectToDb();
  const user = await authUser();
  let wishes=null
  if(user){
      wishes = await wishModel.find({user:user._id}).populate('product','name price score')
  }

  return (
    <>
      <Navbar isLogin={user? true : false}/>
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id} product={wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
