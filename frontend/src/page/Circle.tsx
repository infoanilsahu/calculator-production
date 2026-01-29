import Cart from '../components/Cart'
import circle from '../assets/circle.png'


function Circle() {
  return (
    <>
      <div className="container">
        <div className="data">
            <Cart title='Area of Circle' link='areaofcircle' image={circle} />
        </div>
      </div>
    </>
  )
}

export default Circle
