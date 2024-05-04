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

const product = async ({params}) => {
  const user = await authUser();
  ConnectToDb();
  const product = await Product.findOne({_id: params.id}).populate('comments');

  console.log(JSON.parse(JSON.stringify(product)))

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))}/>
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default product;
