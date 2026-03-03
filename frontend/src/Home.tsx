
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import History from "./components/common/History";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import { alternative } from "./redux/cross/cross";
import Cart from "./components/common/Cart";
import { carts } from "./function/cart";


export default function Home() {
  const userLogin = useSelector( (state: RootState) => state.userLogin.value)
  const log = useSelector((state: RootState) => state.log.value);
  const cross = useSelector((state: RootState) => state.cross.value);
  const dispatch = useDispatch();

  console.log(userLogin);
  

  return (
    <>
      <div className="home-container w-full h-dvh ">
        <div className="content w-full h-full ">
          <div className="data h-full w-full overflow-hidden ">
            <div className={`sign-login w-screen overflow-hidden `}>
              <div
                className={`a ${
                  cross ? " h-[70%]  md:w-[40%] md:h-dvh " : " h-0 md:w-0 md:h-dvh "
                } z-20 w-full  absolute top-0 md:right-0 overflow-hidden transition-all duration-150 `}
              >
                <div className="h-full">{log ? <Register /> : <Login />}</div>
              </div>
              <div
                onClick={() => dispatch(alternative())}
                className={`bg-[#1c1c1c] z-10 opacity-40 ${
                  cross ? "w-screen" : "w-0"
                } h-dvh absolute `}
              ></div>
            </div>
            <Navbar />
            <div className="home-data flex flex-1 sm:justify-between h-full w-full ">
              <div className="carts w-full h-full overflow-y-scroll">
                <div className="cal p-2 lg:p-5 flex flex-1 flex-col sm:flex-row sm:flex-wrap  ">
                  { 
                    carts.map( (data) => (
                      <Cart title={data.title} image={data.image} link={data.link} />
                    ))
                  }
                </div>
                  <div className="w-full h-28"></div>
              </div>
              <div className={`history ${userLogin ? "lg:block" : "lg:hidden"} hidden w-[40%] h-full  `}  >
                <History />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


