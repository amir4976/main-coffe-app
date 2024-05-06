import { FaStar,FaRegStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({username,body,email,score,date}) => {

  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{username}</strong>
            <p>
              {new Date(date).toLocaleDateString('fa-IR')}
            </p>
          </div>
          <div className={styles.stars}>
          {
            new Array(score).fill(0).map((index,item) => (
              <FaStar key={index} />
            ))
          }
          {
            new Array(5-score).fill(0).map((index,item) => (
              <FaRegStar key={index} />
            ))
          }
          </div>
        </div>
        <p>
            {body}
        </p>
      </div>
    </section>
  );
};

export default Comment;
