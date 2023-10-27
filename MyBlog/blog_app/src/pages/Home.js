import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCont } from "../context";


export default function Home(){

      const {Logout, profileName, setProfileName,postinfo, setPostinfo } = useContext(ProductCont)

       useEffect(() => {
              fetch("http://localhost:3100/Profile").then(res => {
                     res.json().then(result => {
                            setPostinfo(result)})

              })
       },[])

//const {_id, userauthor, userid, createdAt, title, summary, pix} = postinfo
 
       return(
              <>{(postinfo && postinfo.map(postinfo =>(
              <div className="Homepage" key = {postinfo._id}>
                     <div className="imgContainer">
                          <Link to ={`/post/${postinfo._id}`}>  <img src={`http://localhost:3100/${postinfo.pix}`} alt="placeholder" /> </Link>
                     </div>
                     <div className="textContainer">
                           <Link to ={`/post/${postinfo._id}`}> <h1 className="texthead" >{postinfo.title}</h1> </Link>
                            <div className='profile'>
                                   <h3>@{postinfo.userauthor}</h3>
                                   <time className="time">{Date.UTC((postinfo.createdAt))}</time>
                            </div>
                            <h3 className="textbody"> {postinfo.summary}</h3>
                     </div>                
              </div>))
              )}</>
       )
}