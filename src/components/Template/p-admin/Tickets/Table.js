"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { ShowSwal } from "@/utils/Helpers";
import Swal from "sweetalert2";

export default function DataTable({ Tickets, title }) {
  const [AllTickets, setAllTickets] = useState(Tickets);

  const ShowMassage = (body) => {
    Swal.fire({
      title: "پیام",
      html: body,
      confirmButtonText: "تایید",
      confirmButtonColor: "#3085d6",
    });
  };

  const DeleteTicket = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const request = await fetch(`/api/Ticket/${id}`, {
            method: "DELETE",
          });

          const response = await request.json();
          console.log(request);

          if (request.status === 200) {
            ShowSwal({
              title: "پیام",
              text: "با موفقیت حذف شد",
              icon: "success",
            });
            setAllTickets(AllTickets.filter((ticket) => ticket._id !== id));
          } else {
            ShowSwal({
              title: "پیام",
              text: "خطایی رخ داده است",
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      ShowSwal({ title: "خطا", body: "خطایی رخ داده است", icon: "error" });
    }
  };

  const AnswerTicket = async (ticket) => {
    try {
      Swal.fire({
        title: "پاسخ",
        text: "لطفا پاسخ خود را بنویسید",
        icon: "information",
        input: "textarea",
        inputPlaceholder: "پاسخ خود را بنویسید",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
      }).then(async (result) => {

        if (result.isConfirmed) {

        if(result.value === ""){
          ShowSwal({
            title: "پیام",
            text: "پاسخ خود را وارد کنید",
            icon: "error",
          });
          return
        } 
        const answer = {
          ...ticket,
          ticketID:ticket._id,
          body:result.value
        }

        const request =await fetch('/api/Ticket/answer',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(answer)
        })

      }});
  }catch (error) {
    console.log('ssss')
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
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
              <th>مشاهده پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {AllTickets.map((Ticket, index) => {
              if(Ticket.isAnswer === true){
                return
              }
              return (
                (
                  <tr key={Ticket._id} style={Ticket.hasAnswer ? {backgroundColor:"#64de37"}:{}}>
                    <td>{index }</td>
                    <td>{Ticket.userID.name}</td>
                    <td>{Ticket.title}</td>
                    <td>{Ticket.department.title}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                        onClick={() => ShowMassage(Ticket.body)}
                      >
                        مشاهده
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                        onClick={() => DeleteTicket(Ticket._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      <button type="button" className={styles.delete_btn} onClick={() => AnswerTicket(Ticket)}>
                        {Ticket.hasAnswer ? "بروزرسانی" : "پاسخ"}
                      </button>
                    </td>
                    <td>
                      <button type="button" className={styles.delete_btn}>
                      {Ticket.hasAnswer ? "مشاهده" : "ندارد"}
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
