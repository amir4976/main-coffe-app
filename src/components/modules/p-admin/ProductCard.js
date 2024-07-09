"use client";
import React from "react";
import style from "./productCard.module.css";
import Image from "next/image";
import { ShowSwal } from "@/utils/Helpers";
import Swal from "sweetalert2";
function ProductCard({ product }) {
  const ShowInfo = () => {
    console.log(product)
    ShowSwal({
      title: product.name,
      text: `${product.LongDescription}
      ;- وزن  ${product.weight} گرم 
      ;- قیمت  ${product.price} تومان 
      ;- بو ${product.smell} ;-
       برای چه کسی مناسب است؟ ${product.suitableFor}`,
      icon: "info",
      confirmButtonText: "موافق",
    });
  };

  const deleteProduct = async (id)=>{
    Swal.fire({
      title: 'آیا از حذف اطمینان دارید؟',
      text: "با حذف این محصول موارد زیر حذف می شود",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله حذف شود',
      cancelButtonText: 'خیر'
    }).then(async (res)=>{
      if(res.isConfirmed){
        const DeletedProduct = await fetch(`/api/product/${id}`,{
          method:"DELETE"
        })
        if(DeletedProduct.status === 200){
          ShowSwal({
            title: "محصول حذف شد",
            text: "محصول با موفقیت حذف شد",
            icon: "success",
            confirmButtonText: "موافق",
          });
        }else{
          ShowSwal({
            title: "محصول حذف نشد",
            text: "محصول با موفقیت حذف شد",
            icon: "error",
            confirmButtonText: "موافق",
          });
        }
      }
    })

  }





  return (
    <div className={style.productCard}>
      <div className={style.rightside}>
        <div className={style.imageCard}>
          <Image src="/images/clubset1.jpg" fill alt="info" />
        </div>
        <div className={style.Product_info}>
          <span>{product.name}</span>
          <p>{product.shortDescription}</p>
        </div>
      </div>
      <div className={style.btns}>
        <button onClick={()=>deleteProduct(product._id)}>delete</button>
        <button>update</button>
        <button onClick={ShowInfo}>Show Info</button>
      </div>
    </div>
  );
}

export default ProductCard;
