"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { ShowSwal } from "@/utils/Helpers";
import Swal from "sweetalert2";

export default function DataTable({ Comment, title }) {
  // we use this state to show the comment and update and delete the comment and show the comment dynamically
  const [AllComment, setAllComment] = useState(Comment);

  //this show comment
  const ShowComment = (Comment)=>{
    ShowSwal({title:Comment.body,icon:"info"})
  }

  const accseptComment = (Comment)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accsept it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const request = await fetch('/api/comments/accsept',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          }
          ,body:JSON.stringify({id:Comment._id})
        })
        if(request.status === 200){
          ShowSwal({title:"با موفقیت تایید شد",icon:"success"})
        }
      }
    });
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ</th>
              <th>مشاهده</th>
               <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید</th>
              <th> پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {AllComment.map((Comment, index) => {
              return (
                (
                  <tr key={Comment._id} >
                    <td>{index }</td>
                    <td>{Comment.username}</td>
                    <td>{Comment.email}</td>
                    <td>{Comment.score}</td>
                    <td>{Comment.product.name}</td>
                    <td>{new Date(Comment.date).toLocaleString("fa-iran")}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                        onClick={()=>ShowComment(Comment)}
                      >
                        مشاهده
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
    
                      >
                       ویرایش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                    {
                      !Comment.isAccepted ? (
                        <button
                        type="button"
                        className={styles.edit_btn}
                        onClick={()=>accseptComment(Comment)}
                      >
                       تایید
                      </button>
                      ):(
                        <>
                        تایید شده
                        </>
                      )
                    }
                    </td>

                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                      >
                       پاسخ
                      </button>
                    </td>
                    
                    <td>
                      <button type="button" className={styles.delete_btn}>
                        بن
                      </button>
                    </td>
                  </tr>
                )
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
