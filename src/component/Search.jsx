import React from "react";
const Search=({searchTerm, setSearchTerm})=>{
    return(
        <div className="search">
            <div>
                <img src="searchicon.png"/>
                <input
                id="search-input"
                type="text"
                placeholder="Type a title!"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}
export default Search;