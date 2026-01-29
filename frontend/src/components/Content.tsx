import Nav from './Nav'
import History from './History'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface content {
  nav: string;
}

function Content({nav}: content) {

  const userLogin = useSelector( (state: RootState) => state.userLogin.value )

  return (
    <>
    <div className="home-container w-full h-dvh ">
        <div className="content w-full h-full ">
          <div className="data h-full overflow-hidden w-full ">
            <Nav nav={nav} />
            <div className="home-data flex sm:justify-between h-full w-full ">
              <div className="carts w-full h-full overflow-y-scroll">
                <div className="cal p-2 lg:p-5 flex flex-col sm:flex-row sm:flex-wrap  ">
                  <Outlet />
                </div>
              </div>
              <div className={`history ${userLogin ? "lg:block" : "lg:hidden"} hidden w-[40%] h-full  `}  >
                <History />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
