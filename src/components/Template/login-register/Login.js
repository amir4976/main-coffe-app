import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { validateEmail, validatePassword } from "@/utils/auth";
import { ShowSwal } from "@/utils/Helpers";
import { useRouter } from 'next/navigation'

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOTP,setIsloginWithOTP] = useState(false)
  const [password,setPassword] = useState("")
  const [PhoneOrEmail,setPhoneOrEmail] = useState("")
  const hideOtpForm = () => {setIsloginWithOTP(false)}
  const router = useRouter()
  console.log('object')
  const LoginWithPassword = async ()=>{
    // { // this section is just about to validate the login filds 
    //check if email or phone is empty
    if(!PhoneOrEmail){
      return ShowSwal({title:"لطفا ایمیل یا شماره موبایل را وارد کنید",icon:"error"})
    }
    // validate email
    if(!PhoneOrEmail.includes("@")){
      console.log(PhoneOrEmail)
      return ShowSwal({title:"ایمیل وارد شده نامعتبر است",icon:"error"})
    }
    //check if password is empty
    if(!password){
      console.log(password)
      return ShowSwal({title:"لطفا رمز عبور را وارد کنید",icon:"error"})
    }
    // validate password
    const isValidPassword = await validatePassword(password);
    if(!isValidPassword){
      console.log(isValidPassword)
      console.log(password)
      return ShowSwal({title:"رمز عبور وارد شده نامعتبر است",icon:"error"})
    }

  // end of validation filds }

    const user = {PhoneOrEmail,password}
    console.log(user)
    const result = await fetch("/api/auth/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })

    if(result.status === 200){
      // login success
      console.log("login success")
      ShowSwal({title:"ورود با موفقیت انجام شد",text:"شما ب  ا موفقیت وارد شدید",icon:'success'})
      return  router.push('/')
         
    }else{
      // login failed
      console.log("login failed")
      return ShowSwal({title:"اطلاعات وارد شد",text:"ایمیل یا رمز عبور اشتباه است",icon:'error'})
    }
  }
  console.log('user')

  return (
    <>
    {
      !isLoginWithOTP ?(
        <>
        <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ایمیل/شماره موبایل"
          value={PhoneOrEmail}
          onChange={(e)=>setPhoneOrEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button className={styles.btn} onClick={()=>LoginWithPassword()}>ورود</button>
        <Link href={"/forget-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده اید؟
        </Link>
        <button className={styles.btn} onClick={()=>setIsloginWithOTP(true)}>ورود با کد یکبار مصرف</button>
        <span>ایا حساب کاربری ندارید؟</span>
        <button className={styles.btn_light} onClick={showRegisterForm}>ثبت نام</button>
      </div>
      <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
      </>
      ):(
         <Sms  hideOtpForm={hideOtpForm}/> 
      )
    }
     

    </>
  );
};

export default Login;
