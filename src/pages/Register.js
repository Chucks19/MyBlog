import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register(){
       const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");
       const [redirect, setRedirect] = useState("");
       function handle(ev){
              ev.preventDefault();
              fetch("http://localhost:3100/Register", {
                     method: 'POST',
                     body: JSON.stringify({username: username, password: password}),
                     headers: {'Content-Type': 'application/json'}
              }).then((res) => {
                     res.clone().json().then(result => {
                    if(res.status === 200 && result === "User already registered, Login to continue")
                    {
                     alert("User already registered, Login to continue")
                                          setRedirect(true);
                     } else if(res.status === 200)
                     {
                            console.log(res.json());
                             alert("Registration success, Login to continue")
                            setRedirect(true);
                     }
                    else{ alert("Registration not successful")}
              })
       })
       }

       if (redirect) {
              return <Navigate to ="/Login" />      
       }
              return(
              <div className="header-form">
                     <form  className="form" onSubmit={handle}>
                            <input type="text" className="user" required placeholder="username" unique="true" value={username} onChange={ev => setUsername(ev.target.value)}/>
                            <input type="password" required placeholder="password" value={password} className= "password" onChange={ev => setPassword(ev.target.value)} />
                            <button className="butt">Submit</button>
                     </form>
              </div>
       )
}
