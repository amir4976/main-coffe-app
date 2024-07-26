import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/Template/p-admin/comments/table.module.css";
import Table from "@/components/Template/p-admin/comments/Table";
import ConnectToDb from "../../../../configs/db";
import CommentModel from "@/models/Comments";

const page = async () => {
  ConnectToDb();
  const Comments = await CommentModel.find({}).populate('user').populate("product").lean().sort({ createdAt: -1 });
  return (
    <Layout>
      <main>
        {Comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد!</p>
        ) : (
          <Table
            Comment={JSON.parse(JSON.stringify(Comments))}
            title="لیست کامنت ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
