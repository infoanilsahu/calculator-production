import { useSelector,useDispatch } from "react-redux";
import type { RootState } from "../redux/store.ts";
import { addHistory,clearHistory, setUser } from "../redux/user/user.ts";
import { useEffect } from "react";
import { formatDateTime } from "../function/dateTime.ts";
import logout from '../icon/logout.svg'
import axios from "axios";
import { clearUser } from "../redux/user/user.ts";
import { setUserLoginFalse, setUserLoginTrue } from "../redux/user/userLogin.ts";
import { useNavigate } from "react-router-dom";


function History() {
    const apiUrl = import.meta.env.VITE_DOMAIN;
    const user = useSelector( (state: RootState) => state.user.value)
    const cross = useSelector( (state: RootState) => state.cross.value)
    const refreshHistory = useSelector( (state: RootState) => state.user.refreshHistory)
    const userLogin = useSelector((state: RootState) => state.userLogin.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleHistory = async () => {
        try {
            if(!userLogin) return;
            dispatch(clearHistory())
            const res = await axios.get(`${apiUrl}/api/v1/data/gethistory`,{withCredentials: true})
            const userData = res.data.data[0];
            if (!userData || !userData.historyAll?.length) return;

            [...userData.historyAll].reverse().forEach( (item: any) => {
                dispatch(
                    addHistory({
                        path: item.path,
                        date: item.createdAt,
                        input: item.input,
                        answer: item.answer,
                    })
                )
            })

            

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);          // FULL backend response
                console.log(error.response?.data.message);  // YOUR message
            }
        }
    }

    const getData = async () => {
    try {
      if(!userLogin) return ;
      const res = await axios.get(`${apiUrl}/api/v1/data/userdata`,{withCredentials: true})
      if(res.status === 200) {
        dispatch(setUser({
          email: res.data.data.email,
          username: res.data.data.username,
        }))
        dispatch(setUserLoginTrue())
      }
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
      console.log(error.response?.data);          // FULL backend response
      console.log(error.response?.data.message);  // YOUR message
  }
    }
  }

  useEffect( () => {
    getData();
  },[cross,userLogin])
    
    useEffect( () => {
        handleHistory()
    },[refreshHistory])


    const handleLogout = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/v1/auth/logout`,{withCredentials: true})
            if(res.status === 200) {
                dispatch(clearUser())
                dispatch(setUserLoginFalse())
                navigate("/")
            }    
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
      console.log(error.response?.data);          // FULL backend response
      console.log(error.response?.data.message);  // YOUR message
            }
        }
    }



  return (
    <>
      <div className="history-container w-full h-full overflow-hidden bg-[#fafafa] overflow-y-scroll ">
        <div className="data m-4  ">
                <div className="user bg-[#e7e7e7] p-1 px-3 rounded-md flex justify-between ">
                    <div className="left p-3 ">
                        <div className="username font-medium text-xl pb-1 ">{user.username}</div>
                        <div className="email text-[12px] font-normal  ">{user.email}</div>
                    </div>
                    <div onClick={() => handleLogout()} className="right flex flex-col items-center cursor-pointer p-3 rounded-md hover:bg-[#c7c7c7] ">
                        <div className="image">
                            <img src={logout} width="28px" alt="" />
                        </div>
                        <div className="text font-medium text-[12px] ">Logout</div>
                    </div>
                </div>
                <div className="history p-3 ">
                    <div className="font-bold mt-3 mb-1">History</div>
                    {user.history?.length > 0 ? (
                        <div className="">
                            {user.history.map( (data,index) => {
                                return (
                                    <div key={index} className="history-container">
                                        <div className="his-count py-2 ">
                                            <div className="title-date flex justify-between items-center">
                                            <div className="title text-[17px] font-normal py-1.5 ">{data.path}</div>
                                            <div className="date font-light text-[12px] ">
                                                {formatDateTime(data.date)}
                                            </div>
                                            </div>
                                            <div className="input flex gap-1 font-light text-sm p-0.5 ">{
                                                Object.entries(data.input).map( ([key,value]) => (
                                                    <div key={key}>
                                                        {key} = {value as number} 
                                                    </div>
                                                ))
                                                }</div>
                                            <div className="answer text-sm font-medium p-0.5 ">answer {data.answer}</div>
                                        </div>
                                        <hr className="opacity-10" />
                                    </div>
                                )
                            })}
                        </div>
                    ): (
                        <div>
                            <div className="no-history font-light opacity-60 ">
                                No History
                            </div>
                        </div>
                    )}
                    <div className="w-full h-25"></div>
                </div>
        </div>
      </div>
    </>
  );
}

export default History;
