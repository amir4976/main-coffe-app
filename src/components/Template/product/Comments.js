import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";
import { comment } from "postcss";

const Comments = ({comments,id,title}) => {
 
  console.log(comments.filter( comment => comment.isAccepted == true ).length)
  return (
    <div>
      <p>نظرات ({comments.filter( comment => comment.isAccepted  ).length }) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
          ({comments.filter((comment)=>comment.isAccepted).length}) دیدگاه برای {title}
          </p>
          <div>
            {comments.map((comment) => 
             comment.isAccepted && <Comment key={comment.id} {...comment} />
            )} 
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={id} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
