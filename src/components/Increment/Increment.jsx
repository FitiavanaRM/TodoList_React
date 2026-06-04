import { useState } from 'react'
import "./Increment.module.css";

function Increment({text, onPass}) {

    const [nbr, setNbr] = useState(0);

    //console.log("rendering")
    
    return (
        <div className="{style.container}">
            <h1>{nbr}</h1>
            <button onClick={()=>{
                setNbr(prev=>prev+1)
                setNbr(prev=>prev+1)
                onPass(nbr)
            }}>Increment</button>
            <h2>{text}</h2>
        </div>
    )
}

export default Increment