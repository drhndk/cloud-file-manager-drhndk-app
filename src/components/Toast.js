import { useContext, useEffect } from "react"
import { ShowToastContex } from "./Context/ShowToastContex";

function Toast({msg}) {
const {showToastMsg,setShowToastMsg} = useContext(ShowToastContex)
useEffect(() => {
const interval = setInterval(() => {
    setShowToastMsg('')
}, 2500);

  return () => {
    clearInterval(interval)
  }
},[showToastMsg])
    return (
        <div className="toast toast-top toast-end">
  <div className="alert alert-success">
    <span>{msg}</span>
  </div>
</div>
    )
}

export default Toast