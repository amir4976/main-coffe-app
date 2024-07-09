import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/Template/p-admin/users/table.module.css";
import Table from "@/components/Template/p-admin/users/Table"
import ConnectToDb from "../../../../configs/db";
import UserModel from "@/models/User";

const page = async () => {
  ConnectToDb();
  const users = await UserModel.find({}).lean();

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <Table
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
