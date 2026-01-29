// import {useState} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import email from "../icon/email.svg";
import user from "../icon/user.svg";
import eyeon from "../icon/eye.svg";
import eyeoff from "../icon/eyeoff.svg";
import password from "../icon/password.svg";
import cross from "../icon/cut.svg";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { alternative } from "../redux/log/log.ts";
import { negative } from "../redux/cross/cross.ts";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

function Register() {

  const setLog = useDispatch()

  const apiUrl = import.meta.env.VITE_DOMAIN;
  const [focused, setFocused] = useState({
    email: false,
    usename: false,
    password: false
  });
  const [eye,setEye] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/register`, data,{ withCredentials: true });
      if (res.status === 200) {
        window.location.reload()
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
      console.log(error.response?.data);          // FULL backend response
      console.log(error.response?.data.message);  // YOUR message
  }
    }
  };

  const handleEye = () => {
    setEye(!eye)
  }

  

  return (
    <>
      <div className="container bg-[#141414] text-white h-full  w-full sm:w-[50%]lg:w-[40%]absoluteright-0 flex flex-col items-center justify-center ">
        <div className="cross absolute right-5 top-5 md:right-10 md:top-10">
          <div onClick={() => setLog(negative())} className="cross-img p-2 rounded-2xl hover:bg-[#202020] ">
            <img src={cross} width="34px" />
          </div>
        </div>
        <div className="content h-full w-full flex flex-col items-center justify-center">
          <div className="heading text-2xl font-bold mb-8 ">Sign Up</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[90%] lg:w-[70%] items-center justify-center mx-4 "
          >
             <div className="email p-2 w-full ">
              <div className="input w-full">
                <div className={`input-data flex gap-3 outline-1 rounded-md p-3 w-full ${focused.email ? "outline-3" : "outline-1"}`}>
                  <div className="email-img">
                    <img src={email} alt="" width="28px" />
                  </div>
                  <input
                    {...register("email", {
                      required: { value: true, message: "Email is require" },
                    })}
                    placeholder="Email"
                    onFocus={() => setFocused((data) => ({...data, email: true}))}
                    onBlur={() => setFocused((data) => ({...data, email: false}))}
                    className="outline-none w-full"
                  />
                </div>
              </div>
              {errors.email && <div className="text-red-400">{errors.email.message}</div>}
            </div>

            <div className="username p-2 w-full ">
              <div className="input w-full">
                <div className={`input-data flex gap-3 outline-1 rounded-md p-3 w-full ${focused.usename ? "outline-3" : "outline-1"}`}>
                  <div className="user-img">
                    <img src={user} alt="" width="28px" />
                  </div>
                  <input
                    {...register("username", {
                      required: { value: true, message: "Username is require" },
                    })}
                    placeholder="Username"
                    onFocus={() => setFocused((data) => ({...data, usename: true}))}
                      onBlur={() => setFocused((data) => ({...data, usename: false}))}
                    className="outline-none w-full"
                  />
                </div>
              </div>
              {errors.username && <div className="text-red-400">{errors.username.message}</div>}
            </div>

            <div className="password p-2 w-full ">
              <div className="input">
                <div className={`input-data outline-1 rounded-md p-3 ${focused.password ? "outline-3" : "outline-1"}`}>
                  <div className="flex items-center justify-between w-full">
                    <div className="password-left flex gap-3 w-full ">
                      <div className="password-img">
                        <img src={password} alt="" width="28px" />
                      </div>
                      <input
                        {...register("password", {
                          required: { value: true, message: "Password is require" },
                        })}
                        placeholder="Password"
                        type={eye ? "text" : "password"}
                        onFocus={() => setFocused((data) => ({...data, password: true}))}
                          onBlur={() => setFocused((data) => ({...data, password: false}))}
                        className="outline-none w-full "
                      />
                    </div>
                    <div onClick={handleEye} className="eye pr-1">
                      <img src={eye ? eyeon : eyeoff} width="24px" />
                    </div>
                  </div>
                </div>
              </div>
              {errors.password && <div className="text-red-400">{errors.password.message}</div>}
            </div>

            <div className="sunmit w-full p-2 mt-4 ">
              <button
                type="submit"
                className="bg-[#edecec] rounded-md p-2 text-black font-extrabold w-full "
              >
                Sign Up
              </button>
            </div>
            <div className="login p-1">
              <span className="font-light ">Already have an account? </span>
              <span onClick={() => setLog(alternative())} className="font-semibold cursor-pointer hover:underline">Log</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
