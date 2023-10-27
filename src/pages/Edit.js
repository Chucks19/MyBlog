import { useState, useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ProductCont } from "../context";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


 
export default function Edit(){
         const [redirect, setRedirect] = useState("");
const {id} = useParams()

       const [title, setTitle] = useState("");
       const [summary, setSumary] = useState("");
       const [text, setText] = useState("");
       const [files, setFiles] = useState("");

       //We want the available information to be display on the Edit page.
       //so we take it from the server and server it on the Edit page

       useEffect(()=>{
              fetch('http://localhost:3100/Post/' + id).then( result =>{
                     result.json().then(result =>{
                     setTitle(result.title)
                     setSumary(result.summary)
                     setText(result.text)
              })
                            
              
              }
              ) 
       },[])

       function UpdatePost(ev){
            ev.preventDefault()
            
             const data = new FormData()
             data.set("title", title)
             data.set("summary",summary)
             data.set("text", text)
             data.set("pix", files[0])
     
             
             fetch(`http://localhost:3100/Edit/${id}`, {
               method: "PUT",      
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
              <div className="header">
                     <form  className="form" onSubmit={UpdatePost}>
                            <input type="text" className="title" required placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)}/>
                            <input type="Sumarry" required placeholder="Summary" value={summary} className= "summary" onChange={ev => setSumary(ev.target.value)} />
                            <input type="file" className="file"  placeholder="Upload Pix" onChange={ev => setFiles(ev.target.files)}/>
                            <ReactQuill className="text" theme="snow" value={text} onChange={setText}/>

                            <button className="butt">Submit</button>
                     </form>
              </div>
       )
}
