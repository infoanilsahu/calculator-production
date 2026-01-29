import Cart from '../components/Cart'
import triangle from '../assets/triangle.svg'

function Enter() {
  return (
    <>
    <div className=''>
      <Cart title='Triangle' link='/triangle' image={triangle} />
    </div>
    </>
  )
}

export default Enter;
