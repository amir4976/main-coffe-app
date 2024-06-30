'use client'
import styles from "@/styles/p-user/sendTicket.module.css";
// import { authUser } from "@/utils/AuthUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
// import ConnectToDb from "../../../../../configs/db";

const Page= () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [departments, setDepartments] = useState([])
  const [departmentID, setDepartmentID] = useState(-1)
  const [subDepartments, setSubDepartments] = useState([]);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [priority, setPriority] = useState(1);
   
  useEffect(() => {
    const getDepartment = async () => {
      const res = await fetch('/api/departments');
      const data = await res.json();
      setDepartments(data); 
    };



    getDepartment();
  }, []);

  useEffect(() => {
    const getSubDepartment = async () => {
      const res = await fetch(`/api/departments/${departmentID}`);
      const data = await res.json();
      console.log(data)
      if(res.status === 200){
        console.log('valid')
        return setSubDepartments(data);
      }
      setSubDepartments([]); 
    };



    getSubDepartment();
  }, [departmentID]);
  
  const handleSubmit = async (e) => {
    const getUserid = await fetch('/api/auth/me');
    const {User} = await getUserid.json()
    console.log(User._id)
    const ticket = {
      title,
      body,
      department :departmentID,
      subDepartment :subDepartmentID,
      priority,
      userID: User._id
      
    }
    
    const request = await fetch('/api/Ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    });
    if(request.status === 200){
      alert('تیکت شما با موفقیت ارسال شد.');
    }else{
      alert('خطایی رخ داده است. لطفا مجددا تلاش کنید.');
    }

  }


  return (
   
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>ارسال تیکت جدید</span>
          <Link href="/p-user/tickets"> همه تیکت ها</Link>
        </h1>

        <div className={styles.content}>
          <div className={styles.group}>
            <label>دپارتمان را انتخاب کنید:</label>
            <select onChange={(e)=>setDepartmentID(e.target.value)}>
              <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
                {departments.map((item) => (
                  <>
                     <option value={item._id}>{item.title}</option>
                  </>
                ))}
              {/* <opt  ion value={"دپارتمان"}>دپارتمان</opt> */}
            </select>
          </div>
          <div className={styles.group}>
            <label>نوع تیکت را انتخاب کنید:</label>
            <select onChange={(e)=>setSubDepartmentID(e.target.value)}>
              <option>لطفا یک مورد را انتخاب نمایید.</option>

                {subDepartments.map((item) => (
                  <>
                     <option value={item._id}>{item.title}</option>
                  </>
                ))}


            </select>
          </div>
          <div className={styles.group}>
            <label>عنوان تیکت را وارد کنید:</label>
            <input placeholder="عنوان..." type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div className={styles.group}>
            <label>سطح اولویت تیکت را انتخاب کنید:</label>
            <select onChange={(e)=>setPriority(e.target.value)} >
              <option>لطفا یک مورد را انتخاب نمایید.</option>
              <option value="3">کم</option>
              <option value="2">متوسط</option>
              <option value="1">بالا</option>
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea rows={10} onChange={(e)=>setBody(e.target.value)}></textarea>
        </div>
        <div className={styles.uploader}>
          <span>حداکثر اندازه: 6 مگابایت</span>
          <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button className={styles.btn} onClick={handleSubmit}>
          <IoIosSend />
          ارسال تیکت
        </button>
      </main>

  );
};

export default Page
