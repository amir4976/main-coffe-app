import ConnectToDb from "../../../../../configs/db";
import TicketsModel from "@/models/Tickets";
import styles from "./tickets.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import Ticket from "./Ticket";

const Tickets = (tickets) => {
  const {Tickets} = tickets;

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      {Tickets.map((ticket,index) => (
        <Ticket key={index} ticket={ticket} />
      ))}


      {/* <p className={styles.empty}>تیکتی ثبت نشده</p> */}
    </div>
  );
};

export default Tickets;
