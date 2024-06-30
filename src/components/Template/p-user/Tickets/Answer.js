import styles from "./answer.module.css";

const Answer = ({ type ,ticket}) => {
  console.log(type,ticket)

  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(ticket.createdAt).toLocaleString("fa-IR")} </p>
        <div>
          <div>
            <p>{ticket.userID.name}</p>
            <span>{ticket.userID.role}</span>
          </div>
          <img src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{ticket.body}</p>
      </div>
    </section>
  );
};

export default Answer;
