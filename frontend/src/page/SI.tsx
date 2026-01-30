import axios from "axios";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { triggerHistoryRefresh } from "../redux/user/user.ts";
import type { RootState } from "../redux/store.ts";

interface Inputs {
    principle: number;
    rate: number;
    time: number;
};

interface History {
  path: string;
  input: {};
  answer: number;
}

function SI() {

    const apiUrl = import.meta.env.VITE_DOMAIN;
    const [answer,setAnswer] = useState<number>(0)
    const userLogin = useSelector((state: RootState) => state.userLogin.value)
    const dispatch = useDispatch()

    const lastSubmittedRef = useRef<Inputs | null>(null);
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const last = lastSubmittedRef.current;

    if (last && last?.principle == data.principle && last.rate == data.rate && last.time == data.time) {
      return ;
    }
    
    const rawcal = (data.principle*(data.rate/100)*data.time);
    let cal;
    if(Number.isInteger(rawcal)) {
      cal = rawcal
    }
    else {
      cal = Number(rawcal.toFixed(3));
    }
    setAnswer(cal)
    const history: History = {
      path: "simple interest",
      input: data,
      answer: cal
    }
    try {
      if(!userLogin) return;
      await axios.post(`${apiUrl}/api/v1/upload/history`, history,{ withCredentials: true });

      lastSubmittedRef.current = data;

      dispatch(triggerHistoryRefresh())
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
      console.log(error.response?.data);          // FULL backend response
      console.log(error.response?.data.message);  // YOUR message
  }
    }
  };

  return (
    <>
      <div className="container w-full ">
        <div className="data w-full">
            <div className="form flex flex-col items-center justify-center w-full p-6 ">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[65%] lg:w-[40%]">
                <div className="input flex flex-col sm:flex-row flex-wrap gap-4 w-full ">
                    <div className="principle flex flex-col gap-3 w-full ">
                        <label htmlFor="principle" className="font-normal" >Principle (p) : </label>
                        <input type="number" {...register("principle",{required: {value: true,message: "principle is required"},valueAsNumber: true})} placeholder="1526 Rs" className="outline-1 p-2 rounded-md font-normal " />
                        {errors.principle && <div className="text-red-600 font-normal ">{errors.principle.message}</div>}
                    </div>
                    <div className="rate flex flex-col gap-3 w-full ">
                        <label htmlFor="rate" className="font-normal" >Rate (R) : </label>
                        <input type="number" {...register("rate",{required: {value: true,message: "rate is required"},valueAsNumber: true})} placeholder="8 %" className="outline-1 p-2 rounded-md font-normal " />
                        {errors.rate && <div className="text-red-600 font-normal ">{errors.rate.message}</div>}
                    </div>
                    <div className="time flex flex-col gap-3 w-full ">
                        <label htmlFor="time" className="font-normal" >Time (T) : </label>
                        <input type="number" {...register("time",{required: {value: true,message: "time is required"},valueAsNumber: true})} placeholder="5 Year" className="outline-1 p-2 rounded-md font-normal " />
                        {errors.time && <div className="text-red-600 font-normal ">{errors.time.message}</div>}
                    </div>
                </div>
                <div className="submit w-full ">
                    <button type="submit" className="text-[#edecec] rounded-md p-2 bg-black font-bold w-full my-6 " >simple interest</button>
                    <div className="answer text-lg w-full flex items-center justify-center "><span className="font-normal">Answer : &nbsp;</span><span className="font-medium">{Number.isInteger(answer) ? answer : answer.toFixed(3)}</span></div>
                </div>

              </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default SI
