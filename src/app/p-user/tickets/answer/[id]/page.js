import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/Template/p-user/Tickets/Answer";
import ConnectToDb from "../../../../../../configs/db";
import TicketModel from "@/models/Tickets";

const page = async ({ params }) => {
  const ticketID = params.id;
  ConnectToDb();
  const ticket = await TicketModel.findOne({ _id: ticketID }).populate('userID','name role');
  const answer = await TicketModel.findOne({
    mainTicket: ticketID,
  });
console.log("tiket model ::",JSON.parse(JSON.stringify(ticket)))

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          {/* <Answer type="user" /> */}
          
            {
                ticket && (
                     <Answer type="user" ticket={JSON.parse(JSON.stringify(ticket))} />     
                )
            }
            {
                answer && (
                     <Answer type="admin" ticket={JSON.parse(JSON.stringify(answer))} />
                )
            } 



            {
                !answer && (
                    <div className={styles.empty}>
                      <p>هنوز پاسخی دریافت نکردید</p>
                    </div>
                )
            }
        </div>
      </main>
    </Layout>
  );
};

export default page;
