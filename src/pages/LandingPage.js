


import {useState} from 'react'
import ScratchOff from '../components/ScratchOff'
import Scratch from '../components/Scratch'


function LandingPage() {
  const [cursorPosition,setCursorPosition] = useState({x:0,y:0})

 

    return (
      <div className='scratchContainer'>
      <Scratch />
  <ScratchOff
        className={'scratchOff'}
        width={window.innerWidth}
        height={window.innerHeight}
        background="images/background.png"
        foreground='images/foreground.jpg'
        // onfinished={callback}
      />
      </div>
      
    )
}

export default LandingPage