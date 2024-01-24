import { useEffect, useState } from "react"

const Popup = ({ message }) => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    
    const timeout = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [message])

  return (<>
    {show && message && <div style={{position: "fixed", top: 0, right: 0}}>{message}</div>}
    
  </>)
}

export default Popup