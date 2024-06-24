import React , {useId} from "react";
import "./input.css"


function Input({
    label,
    type= "text",
    classes="",
    placeholder = "",
    ...props
} , ref) {
   const id = useId()
    return(
      <>
     <div className={`input-field ${classes} `}>
     {label &&  <label  className="input-label" 
     htmlFor=
     {id}
     >
      {label}
   </label>
   }
   <input placeholder={placeholder}  type={type} {...props} ref={ref} id={id}/>
     </div>
      
      </>
    )
}

export default React.forwardRef(Input);



