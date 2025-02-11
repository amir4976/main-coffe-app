import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import { authUser } from "@/utils/AuthUser";
import { redirect } from "next/navigation";
const Layout = async ({ children }) => {
  const user =await authUser()
  if(user){
    if(user.role !== 'ADMIN'){
      return redirect('/login-register')
    }
  }else{
    return redirect('/login-register')
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar AdminName={user.name}/>
        <div className={styles.contents}>
          <Topbar AdminName={user.name}/>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
