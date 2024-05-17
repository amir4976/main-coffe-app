"use client"
import { useState } from "react";
import styles from "./form.module.css";
import { ShowSwal } from "@/utils/Helpers";

const Form = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [company,setCompany] = useState('');
  const [phone,setPhone] = useState('');
  const [message,setMessage] = useState('');
 
  const SendMassage = async (e)=>{
    e.preventDefault();
    
    const Contact = {
      name,
      email,
      company,
      phone,
      message
    }

    const res = await fetch('http://localhost:3000/api/contact',{
      method:"POST"
      ,headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(Contact)
    })

    if(res.status===201){
      ShowSwal({icon:'success',title:'ارسال پیام',text:'پیام شما با موفقیت ارسال شد'})
      setName('') 
      setEmail('') 
      setCompany('') 
      setPhone('') 
      setMessage('') 
    }
  }

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)}/>
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea name="" id="" cols="30" rows="3" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
      </div>
      <button onClick={(e)=>SendMassage(e)} >ارسال</button>
    </form>
  );
};

export default Form;
