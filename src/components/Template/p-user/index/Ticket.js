import Link from "next/link";
import styles from "./ticket.module.css";

const Ticket = ({ ticket }) => {
  console.log(ticket)
  return (
    <Link href={`/p-user/tickets/answer/${ticket._id}`} className={styles.ticket}>
      <div>
        <p>{ticket.title} </p>
        <p className={styles.department}>{ticket.department.title}</p>
      </div>
      <div>
        <p>8:00 1402/10/21</p>
        <p className={styles.no_answer}>پاسخ داده نشده</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
