import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { createBrowserRouter,createRoutesFromElements, RouterProvider,Route } from "react-router-dom";
// import Register from './components/Register.tsx';
import Home from './Home.tsx';
import Ass from './components/Ass.tsx'
import Content from './components/Content.tsx';
import SI from './page/SI.tsx';
import Circle from './page/Circle.tsx';
import AreaofCircle from './page/AreaofCircle.tsx';
import { TokenCheck } from './middleware/authmiddleware.ts';
import History from './components/History.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import CI from './page/CI.tsx';




const router = createBrowserRouter(createRoutesFromElements(
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


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>
 </StrictMode>,
)
