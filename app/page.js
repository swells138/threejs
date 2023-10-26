
import Image from 'next/image'
import CanvasCom from './components/CanvasCom'
import ThreeScene from './components/ThreeScene'


export default function Home() {
  return (
    <>
      <div className='scene'>
        <CanvasCom></CanvasCom>
      </div>
    </>
  )
}
