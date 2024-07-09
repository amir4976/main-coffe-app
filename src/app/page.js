import Image from "next/image";
import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/Template/index/banner/Banner";
import Latest from "@/components/Template/index/latest/Latest";
import Pormote from '@/components/Template/index/promote/Promote'
import Footer from "@/components/modules/footer/Footer";
import { authUser } from "@/utils/AuthUser";
import ProductModel from "../models/Product";

export default async function Home() {
  const user = await authUser();
  const LastProducts = await ProductModel.find({}).limit(4);
  console.log(user)
  
  return (
    <>
      <Navbar  isLogin={user? true : false} userRole={user?.role}  />
      <Banner />
      <Latest LastProducts={LastProducts} />
      <Pormote/>
      <Footer/>
    </>
  );
}