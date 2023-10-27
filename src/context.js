import  { createContext, useState, useEffect } from 'react';

export const ProductCont = createContext({});
export function Provider({children}){       
       
       const [profileName, setProfileName] = useState({})

            const [username, setUsername] = useState(null);
                   const [postinfo, setPostinfo] = useState([])
                   const [post, setPost] = useState(null)




       function Logout(){
              fetch("http://localhost:3100/Logout", {
                     credentials: "include",
                     method:"POST",

              })
                         setProfileName(null)
                         

       }
       return(
              <ProductCont.Provider value={{profileName, setProfileName, Logout, postinfo, setPostinfo, post, setPost }}> {children}
              </ProductCont.Provider>
               )
       }
