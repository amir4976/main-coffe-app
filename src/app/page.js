import Image from "next/image";
import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/Template/index/banner/Banner";
import Latest from "@/components/Template/index/latest/Latest";
import Pormote from '@/components/Template/index/promote/Promote'
import Footer from "@/components/modules/footer/Footer";
import { authUser } from "@/utils/AuthUser";
export default async function Home() {
  const user = await authUser();
  return (
    <>
      <Navbar  isLogin={user? true : false} />
      <Banner />
      <Latest/>
      <Pormote/>
      <Footer/>
    </>
  );
}