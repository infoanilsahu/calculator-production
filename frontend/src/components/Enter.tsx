import Cart from '../components/common/Cart'
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
