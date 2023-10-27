import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductCont } from "../context";

export default function Login(){
         const [redirect, setRedirect] = useState("");

      const {Logout, profileName, setProfileName} = useContext(ProductCont)
       const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");

       function Lgin(ev){
              ev.preventDefault()
              fetch("http://localhost:3100/Login", {
                     method: "POST",
                     body: JSON.stringify({username: username, password: password}),
                     headers: {'Content-Type': 'application/json'},
                     credentials: "include",
              })
              .then(result => {
                     if (result.ok) {
                            result.json().then(json => {
                           setProfileName(json);
                           
                            setRedirect(true)
                            alert("Login successful")
                             })
              }else{
                     alert("invalid credentials")
              }})
}             
              if (redirect) {
                     return <Navigate to ="/" />
              }
              
       return(
              <div className="header-form">
                     <form  className="form" onSubmit={Lgin}>
                            <input type="text" className="user" required placeholder="username" unique="true" value={username} onChange={ev => setUsername(ev.target.value)}/>
                            <input type="password" required placeholder="password" value={password} className= "password" onChange={ev => setPassword(ev.target.value)} />
                            <button className="butt">Submit</button>
                     </form>
              </div>
       )
}
