"use client";
import React, { useEffect } from "react";
import styles from "@/styles/p-admin/AddProduct.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { ShowSwal } from "@/utils/Helpers";
import Link from "next/link";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [suitAbleFor, setSuitAbleFor] = useState("");
  const [smell, setSmell] = useState("");
  const [Tags, setTags] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");


  const AddProductHandler = async () => {
    // Validation (You)

    const ProductNewInfos = {
        name,
        price,
        shortDescription,
        longDescription,
        weight,
        suitableFor:suitAbleFor,
        smell,
        Tags,
    };

    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProductNewInfos),
    });

    console.log(await res.json())




    if (res.status == 201) {
      console.log('success')
      ShowSwal({
        title: "اطلاعات مورد نظر ثبت و محصول اضافه شد",
        icon: "success",
        buttons: "فهمیدم",
      })
    }else if(res.status === 400){
        swal({
            title:"محصول موجود است",
            icon:"warning",
            buttons:"فهمیدم"
        })
        console.log('object')
    }else{
      swal({
        title:"مشکل فنی",
        icon:"warning",
        buttons:"فهمیدم"
    })
  
    }
  };



  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> اضافه کردن محصول</span>
          <Link href={'/p-admin/products/productsList'} className={styles.titleBTN}> لیست محصولات</Link>
        </h1>
        <div className={styles.details_main}>
          <section>
            {/* // product name */}
            <div>
              <label>نام محصول</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام محصول خود را وارد کنید"
                type="text"
              />
            </div>


    {/* //product Price */}
            <div>
              <label>قیمت محصول</label>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="لطفا قیمت محصول خود را وارد کنید"
                type="number"
              />
            </div>



            <div>
              <label>وزن محصول</label>
              <input
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="لطفا وزن محصول خود را وارد کنید"
                type="number"
              />
            </div>

            <div>
              <label>جزییات کوتاه محصول</label>
              <input
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                placeholder="لطفا اطلاعات کوتاه محصول را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>جزییات بلند محصول</label>
              <textarea
                value={longDescription}
                onChange={(event) => setLongDescription(event.target.value)}
                placeholder="لطفا اطلاعات بلند محصول خود را وارد کنید"
                type="text"
              />
            </div>

          </section>
          <section>
            <div className={styles.uploader}>
              <img src="/images/clubset1.jpg" alt="" />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input type="file" name="" id="" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>

            <div>
              <label>مناسب برای</label>
              <input
                value={suitAbleFor}
                onChange={(event) => setSuitAbleFor(event.target.value)}
                placeholder="لطفا وارد کنید که این محصول مناسب چه کسانی هست"
                type="text"
              />
            </div>
            <div>
              <label>بو</label>
              <input
                value={smell}
                onChange={(event) => setSmell(event.target.value)}
                placeholder="لطفا بوی محصول خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>تگ ها</label>
              <input
                value={Tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="لطفا تگ های محصولل خود را وارد کنید"
                type="text"
              />
            </div>


 
          </section>
        </div>
        <button
          type="submit"
          onClick={AddProductHandler}
          className={styles.submit_btn}
        >
          اضافه کردن محصول
        </button>
      </div>
    </main>
  );
}

export default AddProduct;
