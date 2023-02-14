


import {useState} from 'react'
import ScratchOff from '../components/ScratchOff'


function LandingPage() {
  const [cursorPosition,setCursorPosition] = useState({x:0,y:0})

 

    return (
        <ScratchOff
        width={window.width}
        height={window.height}
        background="images/background.png"
        foreground='images/foreground.jpg'
        // onfinished={callback}
      />
    )
}

export default LandingPage