import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductCont } from "../context";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function CreatePost(){
         const [redirect, setRedirect] = useState("");


       const [title, setTitle] = useState("");
       const [summary, setSumary] = useState("");
       const [text, setText] = useState("");
       const [files, setFiles] = useState("");

      

       function CreateNewPost(ev){
            ev.preventDefault()
             const data = new FormData()
             data.set("title", title)
             data.set("summary",summary)
             data.set("text", text)
             data.set("pix", files[0])
             
             fetch("http://localhost:3100/Profile", {
               method: "POST",      
              body: data,
              credentials: 'include'
              })
              
              .then(json => {
                if (json.ok){
                    
                            setRedirect(true)


                }else{
             alert("invalid credentials")
              } })
       }             
             if (redirect) {
                   return <Navigate to ="/" />
              }
             //add modulea and format to Reactquill

              
       return(
              <div className="headerPost">
                     <form  className="form" onSubmit={CreateNewPost}>
                            <input type="text" className="title" required placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)}/>
                            <input type="Sumarry" required placeholder="Summary" value={summary} className= "summary" onChange={ev => setSumary(ev.target.value)} />
                            <input type="file" className="file"  placeholder="Upload Pix" onChange={ev => setFiles(ev.target.files)}/>
                            <ReactQuill className="text" theme="snow" value={text} onChange={setText}/>

                            <button className="butt">Submit</button>
                     </form>
              </div>
       )
}
