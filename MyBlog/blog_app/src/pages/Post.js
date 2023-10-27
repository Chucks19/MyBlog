import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCont } from "../context";


export default function Post(){
             const {profileName, setProfileName,post, setPost } = useContext(ProductCont)

              const {id} = useParams()
       useEffect(() => {
              fetch('http://localhost:3100/Post/' + id).then(res => {
                     res.json().then(result => {
            setPost (result)

             })
       })},[])


 return(
              <>{(post && 
              <div className="Postpage">

                                          <h1 className="texthead" >{post.title}</h1>
                     <div className='profil'>
                                   <h3>@{post.userauthor}</h3>
                                   <time className="time">{Date(post.createdAt)}</time>
                            </div>
                            {profileName.id === post.userid && (<Link to={`/edit/${post._id}`}> <div className='editdiv'>
                            <div className="edit">Edit this Post</div>
                            </div></Link>)}
                     <div className="imgContainer">
                           <img src={`http://localhost:3100/${post.pix}`} alt="placeholder" />
                     </div>
                     <div className="textContainer">
                             {/* to use string in html, we use dangerouslysetInnerHTML*/}
                            <h3 className="textbody" dangerouslySetInnerHTML={{__html: post.text}} />
                     </div>                
              </div>
              )}</>
       )
}
// hfhhhf