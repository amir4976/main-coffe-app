import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/AuthUser";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user =await authUser()
  if(!user){
    redirect('/login-register')
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar user={user} />
        <div className={styles.contents}>
          <Topbar user={user}/>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
