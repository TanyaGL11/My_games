import { useEffect, useState } from "react"

export const Counter  = () => {
    const [count, setCount] =useState(0)
    const [visibel, setVisibel] = useState(false)
    useEffect(() => {
        if (count % 2) 
          {setVisibel(true)}
        else {
            setVisibel(false) 
        }
    }, [count])
    return (
        <div>
          <div>Click: {count}</div>
          <button onClick={() => setCount(count + 1)}>CLICK ME</button>
          {!visibel  && <div>Visibel</div>}
        </div>
    )
}