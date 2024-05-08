import styles from "@/styles/product.module.css";
import Gallery from "@/components/Template/product/Gallery";
import Details from "@/components/Template/product/Details";
import Tabs from "@/components/Template/product/Tabs";
import MoreProducts from "@/components/Template/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/AuthUser";
import Product from "../../../../models/Product";
import ConnectToDb from "../../../../configs/db";
import wishListModel from '../../../../models/WishList'

const product = async ({params}) => {
  //find if user is logged or not
  const user = await authUser();
  ConnectToDb();
  // find product
  const product = await Product.findOne({_id: params.id}).populate('comments');
  
  // find related product
  const relatedProducts = await Product.find({category: product.category}).limit(5);

  // find if is in wishlist

  let isInwishList = false
  const wishList = await wishListModel.find({product:params.id})
  if(wishList){
    isInwishList = true
  }else{
    isInwishList = false
  }
  
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} isInwishList={isInwishList} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))}/>
        <MoreProducts relatedProducts={JSON.parse(JSON.stringify(relatedProducts))} product={JSON.parse(JSON.stringify(product))} />
      </div>
      <Footer />
    </div>
  );
};

export default product;
