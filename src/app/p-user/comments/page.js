import DataTable from "@/components/Template/p-user/comments/dataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import ConnectToDb from "../../../../configs/db";
import CommentModel from "../../../models/comments";
import { authUser } from "@/utils/AuthUser";

const Page = async () => {
    ConnectToDb()
   const user = await authUser();
   const userID = String(user._id)
   console.log(userID)
   const Comments = await fetch("http://localhost:3000/api/comments")
   const res=  await Comments.json()
   const allComments =res.comments.filter(item=>item.user==userID)


  return (
    <Layout>
      <main>
        <DataTable
          comments={allComments}
          title="لیست کامنت‌ها"
        />

        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </Layout>
  );
};

export default Page;
