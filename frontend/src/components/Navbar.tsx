import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store.ts'
import { alternative } from "../redux/cross/cross.ts";
import search from "../icon/search.svg"
import account from "../icon/account.svg"
import { Link } from 'react-router-dom';


function Navbar() {
  const userLogin = useSelector( (state: RootState) => state.userLogin.value)
  const dispatch = useDispatch()
  

  

  return (
    <>
    <div className="Navbar-container bg-[#141414] text-white w-full sticky top-0 z-10 ">
      <div className="content py-1 lg:px-15 flex items-center justify-between ">
        <div className="left text-white m-1 mx-4">
          <div className='logo font-bold text-2xl p-2'>
            <Link to="/">
              calculator
            </Link>
          </div>
        </div>

        <div className="right cursor-pointer m-1 ">
          <div className="right-content p-2 flex items-center justify-center gap-2">
            <div className="search p-1">
              <img src={search} width="28px" />
            </div> 
               
            <div className="account p-1">
              {userLogin ? (
                <div> 
                  <div className="user">
                    <Link to="/history" >
                      <img src={account} width="28px" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="login">
                    <button onClick={() => dispatch(alternative())} className='bg-white p-1 px-3 text-black font-bold rounded-sm m-2 cursor-pointer '>Login</button>
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

export default Navbar
