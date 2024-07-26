import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/Template/p-admin/users/table.module.css";
import Table from "@/components/Template/p-admin/Tickets/Table";
import ConnectToDb from "../../../../configs/db";
import TicketsModel from "@/models/Tickets";

const page = async () => {
  ConnectToDb();
  const Tickets = await TicketsModel.find({}).populate("department").populate("userID").lean().sort({ createdAt: -1 });
  console.log(Tickets)
  return (
    <Layout>
      <main>
        {Tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد!</p>
        ) : (
          <Table
            Tickets={JSON.parse(JSON.stringify(Tickets))}
            title="لیست تیکت ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
