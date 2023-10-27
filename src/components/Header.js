import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import {ProductCont} from "../context"

export default function Header(){

      const {  profileName, setProfileName} = useContext(ProductCont)

       
       useEffect(()=>{
              fetch("http://localhost:3100/Header", {
              credentials: "include",
             }).then(result =>{
             result.json().then(result=> setProfileName(result))
             })
       },[])
        function Logout(){
              fetch("http://localhost:3100/Logout", {
                     credentials: "include",
                     method:"POST",

              })
                         setProfileName(null)
                         

       }
       const username = profileName?.username
              console.log(profileName?.id)

       return(

              <div className="header">
                     <nav className="navContainer">
                           <div className="logo"> <Link to= "/"> {username? username: "My Blog"}</Link>
                            </div>
                            <div className="RegLog">
                                         {username?<div className ="headerdesign"> <Link to= "/ProfilePage" className = "design"> Create Post  </Link>
                                         <Link to = "/" onClick = {Logout} className = "design">Log Out</Link> </div>:<div className="headerdesign">
                                   <Link to= "/Register" className = "design">  Register  </Link>
                                   <Link to= "/Login" className = "design desi">  Login  </Link> </div>}
                            </div>
                     </nav>
              </div>
       )
}
