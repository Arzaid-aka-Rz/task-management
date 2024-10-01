import { useEffect } from "react"


const useDetectOutside = ({ ref, callback }) => {
  useEffect(()=>{
  // handler to detect clicks outside the ref
  const handleClickOutside=(e)=>{
    if(ref.current && !ref.current.contains(e.target)){
      callback();
    }
  };
  
  // add event listener
  document.addEventListener("mousedown",handleClickOutside);

  // cleanup
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  
  },[ref, callback])
  return (
    <div>
      ref;
    </div>
  )
}

export default useDetectOutside
