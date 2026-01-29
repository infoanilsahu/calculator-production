import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import search from '../icon/search.svg'
import account from '../icon/account.svg'
import arrow from '../icon/arrow.svg'
import type { RootState } from '../redux/store';
import { setUser } from '../redux/user/user.ts'
import { setUserLoginTrue } from '../redux/user/userLogin.ts'
import { useEffect } from 'react';
import axios from 'axios';

interface nav {
    nav: string;
}


function Nav({nav}:nav) {

    const userLogin = useSelector( (state: RootState) => state.userLogin.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_DOMAIN;

    const getData = async () => {
        try {
          if(!userLogin) return ;
            const res = await axios.get(`${apiUrl}/api/v1/data/userdata`,{withCredentials: true})
            if (res.status === 200) {
                dispatch(setUser({
                    email: res.data.data.email,
                    username: res.data.data.username
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
        getData()
    },[])
    

  return (
    <>
      <div className="Navbar-container bg-[#141414] text-white w-full sticky top-0 z-10 ">
        <div className="content py-1 lg:px-15 flex items-center justify-between ">
        <div className="left text-white m-1 mx-4 flex items-center justify-center sm:gap-1.5 overflow-hidden ">
            <div onClick={ () => navigate(-1) } className="arrow shrink-0 ">
                <img src={arrow} width="35px" />
            </div>
          <div className='logo font-semibold truncate text-2xl text-nowrap w-full '>
              {nav}
          </div>
        </div>

        <div className="right cursor-pointer m-1 w-fit  ">
          <div className="right-content p-2 flex items-center justify-center gap-2">
            <div className="search p-1 shrink-0 ">
              <img src={search} width="28px" />
            </div>    
            <div className="account p-1">
              {userLogin ? (
                <div> 
                  <div className="user pr-3 ">
                    <Link to="/history">
                      <img src={account} width="30px" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="login">
                    <Link to="/">
                    <button className='bg-white p-1 px-3 text-black font-bold rounded-sm m-2 '>Login</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Nav
