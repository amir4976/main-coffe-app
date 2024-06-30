"use client"

import { ShowSwal } from "@/utils/Helpers"
import { useEffect,useState } from "react"
import { CiHeart } from "react-icons/ci"

function AddToWishList({productId}) {
  const [User ,setUser] =useState({}) 
  useEffect(() => {
       const AuthUser = async () => {
           const user = await fetch('/api/auth/me')
           if(user.status === 200){
              const data =await user.json()
              console.log(data.User)
                setUser({...data.User})
           }
       }
       AuthUser()
    }, [])

    const addToWishList = async (e) =>{
        e.preventDefault();

        if(!User._id){
          return ShowSwal({icon:'error',title:"authentication error",text:"user not login!!"})
        }

        const wish = {
          user:User._id,
          product:productId
        }
        const Res = await fetch('/api/WishList',{
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify(wish),
        }) 
        if(Res.status === 200){
          return ShowSwal({icon:'success',title:"success",text:"product added to wishlist"})
        }
      }
  return (
    <div onClick={addToWishList}>
        <CiHeart />
        <a>افزودن به لیست علاقه مندی ها</a>
    </div>
  )
}

export default AddToWishList
