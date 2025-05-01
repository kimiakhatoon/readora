import { useState } from "react";

const Card =({title})=>{
    const [hasLiked, setHaseLiked]= useState(false);
    return(
        <div className="card">
            <h2>{title}</h2>
            <button onClick={()=>{setHaseLiked(!hasLiked)}}>
                {hasLiked? "liked" : "like"}
            </button>
        </div>
    )
}
export default Card;