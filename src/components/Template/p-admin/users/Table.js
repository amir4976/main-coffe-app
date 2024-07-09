'use client'
import React, { useState } from "react";
import styles from "./table.module.css";
export default function DataTable({ users, title }) {
  const [usersList,setUsersList] = useState(users)
 

  const ChangeRole = async (userID) => {
    const finduser = usersList.find((user) => user._id === userID);
    console.log(finduser.role)
    const updateUser =await fetch(`/api/user`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json' 
      },
      body : JSON.stringify({
        id:finduser._id,
        name : finduser.name,
        email : finduser.email,
        phone : finduser.phone,
        role : finduser.role == "ADMIN"? "USER" : "ADMIN",
      })})

      if(updateUser.status === 200){
        const allUsers = await fetch('/api/user')
        console.log(allUsers)
        setUsersList(await allUsers.json())
      }
    

    // const UpdateRole = await fetch(`/api/user/${userID}`)
    // if (UpdateRole.status === 200) {
    //   const allUsers = await fetch('/api/user')
    //   setUsersList(await allUsers.json())
    // }

  };


  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn} onClick={()=>ChangeRole(user._id)} >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
