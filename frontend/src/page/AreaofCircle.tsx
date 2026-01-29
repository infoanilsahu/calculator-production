import axios from "axios";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { triggerHistoryRefresh } from "../redux/user/user.ts";
import type { RootState } from "../redux/store.ts";

interface Inputs {
  radius: number;
}

interface History {
  path: string;
  input: {};
  answer: number;
}

function AreaofCircle() {
  const apiUrl = import.meta.env.VITE_DOMAIN;
  const [answer, setAnswer] = useState<number>(0);
  const userLogin = useSelector((state: RootState) => state.userLogin.value);
  const dispatch = useDispatch();

  const lastSubmittedRef = useRef<Inputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const last = lastSubmittedRef.current;

    if (last && last?.radius == data.radius) {
      return;
    }

    const rawcal = Math.PI * data.radius * data.radius;
    let cal;
    if (Number.isInteger(rawcal)) {
      cal = rawcal;
    } else {
      cal = Number(rawcal.toFixed(3));
    }
    setAnswer(cal);
    const history: History = {
      path: "Area of circle",
      input: data,
      answer: cal,
    };
    try {
      if(!userLogin) return;
      await axios.post(`${apiUrl}/api/v1/upload/history`, history, {
        withCredentials: true,
      });

      lastSubmittedRef.current = data;

      dispatch(triggerHistoryRefresh());
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data); // FULL backend response
        console.log(error.response?.data.message); // YOUR message
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="data">
          <div className="form flex flex-col items-center justify-center ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input p-1 px-2 pl-3 flex gap-4 outline-1 items-center justify-center rounded-md my-4 ">
                <div className="radius flex flex-col  ">
                  <label
                    htmlFor="radius"
                    className="font-normal opacity-85 text-sm md:text-lg"
                  >
                    radius :{" "}
                  </label>
                  <input
                    type="number"
                    {...register("radius", {
                      required: { value: true, message: "radius is required" },
                      valueAsNumber: true,
                    })}
                    placeholder="6 cm"
                    className="no-spinner lg:text-xl md:w-80 outline-none rounded-md font-normal "
                  />
                </div>
                <div className="btn h-full">
                  <button
                    type="submit"
                    className="text-[#edecec] h-full md:text-xl rounded-md p-2 px-5 bg-black font-bold "
                  >
                    Area
                  </button>
                </div>
              </div>
              <div className="submit ">
                {errors.radius && (
                  <div className="text-red-600 font-normal ">
                    {errors.radius.message}
                  </div>
                )}
                <div className="answer text-lg w-full flex items-center justify-center ">
                  <span className="font-normal">Area : &nbsp;</span>
                  <span className="font-medium">
                    {Number.isInteger(answer) ? answer : answer.toFixed(3)}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AreaofCircle;
