import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/Template/contact-us/Form";
import Information from "@/components/Template/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import { authUser } from "@/utils/AuthUser";
import Map from "@/components/Template/contact-us/Map";
import Link from "next/link";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={user ? true : false} />

      <Breadcrumb route={"تماس با ما"} />
    <div className={styles.container}>

      <main className={styles.maps}>
        <section >
          <Map position={[35.72021225108499,51.42222691580869]} center={[35.72021225108499,51.42222691580869]} >
            <span>فروشگاه ما</span>
            <h3>ادرس فروشگاه حضوری قهوه ست</h3>
            <p>ادرس کامل : 11سبشسیبشسیب</p>
            <p>09*********</p>
            <Link href="/about-us">درباره</Link>
          </Map>
        </section>
        <section>
          <Map  position={[35.72021225108499,51.42222691580869]} center={[35.72021225108499,51.42222691580869]} >
            <span>فروشگاه ما</span>
            <h1>ادرس فروشگاه حضوری قهوه ست</h1>
            <p>ادرس کامل : 11سبشسیبشسیب</p>
            <p>09*********</p>
            <Link href="/about-us">درباره</Link>
          </Map >
        </section>
      </main>
    </div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
