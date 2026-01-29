import { Link } from "react-router-dom";
// import trianle from '../assets/triangle.svg'

interface cart {
    title: string;
    link: string;
    image: string;
}

function cart({title,link,image}:cart) {
     // Binding element 'title' implicitly has an 'any' type.
  return (
    <>
      <div className='cart-container'>
        <Link to={link}>
        <div className="cart-content flex items-center justify-center">
            <div className="data m-2 w-[85%] h-40 sm:w-60 sm:h-40 rounded-2xl overflow-hidden p-3 outline-1 text-wrap break-all whitespace-normal relative ">
                <div className="title font-medium text-xl">
                    {title}
                </div>
                <div className="img absolute right-0 bottom-0">
                    <img src={image} width="130px"/>
                </div>
            </div>
        </div>
        </Link>
      </div>
    </>
  )
}

export default cart
