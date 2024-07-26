"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { ShowSwal } from "@/utils/Helpers";
import Swal from "sweetalert2";

export default function DataTable({ users, title }) {
  
  const [usersList, setUsersList] = useState(users);

  const ChangeRole = async (userID) => {
    //fire a swal to ask if the user is sure about changing the role
    Swal.fire({
      title: "تبدیل نقش",
      text: "از تبدیل این نقش مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      // then if the user confirms the change server change the role
      if (result.isConfirmed) {
        const finduser = usersList.find((user) => user._id === userID);
        console.log(finduser.role);
        const updateUser = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: finduser._id,
            name: finduser.name,
            email: finduser.email,
            phone: finduser.phone,
            role: finduser.role == "ADMIN" ? "USER" : "ADMIN",
          }),
        });
        //if the user is updated successfully
        if (updateUser.status === 200) {
          const allUsers = await fetch("/api/user");
          setUsersList(await allUsers.json());
          ShowSwal({
            title: "success",
            icon: "success",
            text: "user roll updated successfully",
          });
        }
      }
    });
  };

  const deleteUser = async (userID) => {
    // fire a swal alert to confirm the user if he wants to delete the user
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      //then if the user confirms the deletion
      if (result.isConfirmed) {
        // send a delete request to the server
        const deleteUser = await fetch(`/api/user`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userID,
          }),
        });
        // if the server responds with a success status
        // then update the users list state
        // and show a success message

        if (deleteUser.status === 200) {
          const allUsers = await fetch("/api/user");
          setUsersList(await allUsers.json());
          ShowSwal({
            title: "success",
            icon: "success",
            text: "user deleted successfully",
          });
        }
      }
    });
  };


  const BanThisUser = async (user) => {
    const BanUser =await fetch('/api/user/Ban',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        phone:user.phone,
        email:user.email
      })
    })


    console.log(await BanUser.json())

    if(BanUser.status===201){
      ShowSwal({
        title:'success',
        icon:'success',
        text:'user banned successfully'
      })
    }else{
      ShowSwal({
        title:'error',
        icon:'error',
        text:'user is already banned'
      })
    }
  }

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
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => ChangeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => deleteUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} onClick={()=>BanThisUser(user)} >
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
