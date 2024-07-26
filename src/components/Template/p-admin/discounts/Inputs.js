"use client"
import React, { useEffect, useState } from 'react'
import styles from "./inputs.module.css"
import { ShowSwal } from '@/utils/Helpers';


function Inputs({products}) {
    const [code, setCode] = useState("");
    const [persent, setPersent] = useState("");
    const [maxUse, setMaxUse] = useState("");
    const [product, setProduct] = useState("");


  
    const AddDiscount = async ()=>{
        const discount = {
            code,persent,maxUse,product
        }
        const res = await fetch("/api/discounts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
            ,body:JSON.stringify(discount)
        })
        console.log(await res.json())

    }


  return (
    <section className={styles.discount}>
    <p>افزودن کد تخفیف جدید</p>
    <div className={styles.discount_main}>
      <div>
        <label>شناسه تخفیف</label>
        <input onChange={(e)=>setCode(e.target.value)} placeholder="لطفا شناسه تخفیف را وارد کنید" type="text" />
      </div>
      <div>
        <label>درصد تخفیف</label>
        <input onChange={(e)=>setPersent(e.target.value)} placeholder="لطفا درصد تخفیف را وارد کنید" type="text" />
      </div>
      <div>
        <label>حداکثر استفاده</label>
        <input onChange={(e)=>setMaxUse(e.target.value)} placeholder="حداکثر استفاده از کد تخفیف" type="text" />
      </div>
      <div>
        <label>محصول</label>
        <select name="" id="" onChange={(e)=>setProduct(e.target.value)}>
        <option  value={-1}>انتخاب کنید</option>

            {
                products.map((product,index)=>{
                    return <option key={index} value={product._id}>{product.name}</option>
                })
            }
=
        </select>
      </div>
    </div>
    <button onClick={AddDiscount}>افزودن</button>
  </section>
  )
}

export default Inputs
