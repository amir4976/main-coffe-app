import Sms from "./Sms";
import styles from "./register.module.css";
import { useState } from "react";
import { ShowSwal } from "@/utils/Helpers";
import { validateEmail, validatePassword,validatePhone  } from "@/utils/auth";
import Swal from "sweetalert2";

const Register = ({ showloginForm }) => {

  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isRegesterWithOTP, setIsRegesterWithOTP] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => {setIsRegesterWithOTP(false);};
  
  const signUp = async () =>{
    // validation 

    if(!name.trim()){
     return ShowSwal({title:"نام خود را وارد نکردید", text:"لطفا نام خود را وارد کنید", icon:"error"})      
    }

    const isValidPhone = validatePhone(phone);
    if(!isValidPhone){
     return ShowSwal({title:"شماره تلفن خود را وارد نکردید", text:"لطفا شماره تلفن خود را وارد کنید", icon:"error"})
    }

    if(!email.trim()){
     const isValidEmail = validateEmail(email);
      if(!isValidEmail){
        return ShowSwal({title:"ایمیل خود را وارد نکردید", text:"لطفا ایمیل خود را وارد کنید", icon:"error"})
      }
    }

    const isValidPassword =validatePassword(password);
    if(!isValidPassword){
     return ShowSwal({title:"رمز عبور خود را وارد نکردید", text:"لطفا رمز عبور خود را وارد کنید", icon:"error"})
    }

    const data = {
      name,
      email,
      phone,
      password,
    };
    const res = await fetch("/api/auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(res.status === 201){
      showloginForm();
      return ShowSwal({title:"یوزر با موفقیت ساخته شد", text:"عملیات موفقیت امیز بود", icon:"succsess"})      

    }else{
      console.log(await res.json())
      return ShowSwal({title:"یه مشکلی پیش امد", text:"لطفا مشخصات خود را چک کنید", icon:"error"})      

    }
  }

  // const sendOTP =async()=>{
  //   const isValidPhone = validatePhone(phone);
  //   if(!isValidPhone){
  //    return ShowSwal({title:"شماره تلفن خود را وارد نکردید", text:"لطفا شماره تلفن خود را وارد کنید", icon:"error"})
  //   }
  //   const res = await fetch('api/auth/sms/send',{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify({phone}),
  //   })
  //   if(res.status === 201){
  //     setIsRegesterWithOTP(true);
  //     Swal.fire({
  //       title:"کد ارسال شد",
  //       text:"کد ارسال شد به شماره تلفن شما",
  //       icon:"success",
  //       showCancelButton:true,
  //       confirmButtonText:"باشه",
  //       cancelButtonText:"انصراف",
  //     }).then((result)=>{
  //       if(result.isConfirmed){
  //        setIsRegesterWithOTP(true);
  //       }
  //     })
      
  //   }else{
  //     return ShowSwal({title:"یه مشکلی پیش امد", text:"لطفا مشخصات خود را چک کنید", icon:"error"})
  //   }
  // }

  

  return (
    <>
      {!isRegesterWithOTP ? (
        <>
          <div className={styles.form}>
            <input className={styles.input}
             type="text" 
             placeholder="نام"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {registerWithPass && (
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            )}
            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegesterWithOTP(true)}
            >
              ثبت نام با کد تایید
            </p>
            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              onClick={() => {
                if(!registerWithPass){
                  setRegisterWithPass(!registerWithPass)
                }else{
                  signUp()
                }
              }}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login} onClick={showloginForm}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} phone={phone} />
      )}
    </>
  );
};

export default Register;
