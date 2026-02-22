import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom";
import { TokenCheck } from "../middleware/authmiddleware";
import App from "../App";
import Home from "../Home";
import Content from "../components/Content";
import Ass from "../components/Ass";
import SI from "../page/SI";
import CI from "../page/CI";
import Circle from "../page/Circle";
import AreaofCircle from "../page/AreaofCircle";
import History from '../components/common/History'


export const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<TokenCheck><App /></TokenCheck>}>
    <Route index element={<Home />} />
    <Route path='triangle' element={<Content nav='Triangle' />} >
      <Route index element={<Ass />} />
    </Route>
    <Route path='simpleinterest' element={<Content nav='Simple Interest' />}>
      <Route index element={<SI />} />
    </Route>
    <Route path='compoundinterest' element={<Content nav='Compound Interest' />} >
      <Route index element={<CI />} />
    </Route>
    <Route path='circle' >
      <Route path='' element={<Content nav='Circle' />} >
        <Route index element={<Circle />} />
      </Route>
      <Route path='areaofcircle' element={<Content nav='Area of Circle' />} >
        <Route index element={<AreaofCircle />} />
      </Route>
    </Route>
    <Route path='history' element={<Content nav='History' />} >
      <Route index element={<History />} />
    </Route>
    
    
  </Route>
))