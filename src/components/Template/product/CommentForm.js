import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState } from "react";
import { ShowSwal } from "@/utils/Helpers";

const CommentForm =   ({productID,user}) => {
  const [Score,setScore] =useState(5)
  const [body,setBody] = useState("")
  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("");

  console.log(user)
  const setCommentScore =(score)=>{
    setScore(score)
    console.log(Score)
  }

  const SubmitComment = async (e) => {

    e.preventDefault()
    if(body.length<10){
      ShowSwal({title:"عدد کاراکتر باید بیشتر از ۱۰ باشد",icon:"error"})
      return
    }
    if(username.length<5){
      ShowSwal({title:"نام کاربری حداقل باید ۵ کاراکتر باشد",icon:"error"})
      return
    }
    if(email.length<10){
      ShowSwal({title:"ایمیل حداقل باید ۱۰ کاراکتر باشد",icon:"error"})
      return
    }
    if(Score < 1){
      ShowSwal({title:"امتیاز باید بیشتر از ۱ باشد",icon:"error"})
      return
    }
    console.log(Score)
    const data = {
      username,
      email,
      body,
      score:Score,
      user:user._id,
      productID:productID

    }

    const Result = await fetch("/api/comments",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })
    if(Result.status===201){
      setBody("")
      setScore(0)
      setEmail("")
      setUsername("")
      return ShowSwal({title:"نظر شما با موفقیت ثبت شد",icon:"success"})
    }
  }
  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={()=>setCommentScore(5)} />
          <IoMdStar onClick={()=>setCommentScore(4)} />
          <IoMdStar onClick={()=>setCommentScore(3)} />
          <IoMdStar onClick={()=>setCommentScore(2)} />
          <IoMdStar onClick={()=>setCommentScore(1)} />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
          onChange={(e) => setBody(e.target.value) }
          value={body}
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={SubmitComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
