import React, { Component } from 'react';
import {Link} from "react-router-dom"

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex',background:"#111214",padding:'0.8rem',
        justifyContent:"center",alignItems:"center"}}>

        <Link to="/" style ={{textDecoration:"none"}}>
           <h1 style={{color:"#1158c7"}}>Movies App</h1>
        </Link> 

        <Link to="/fav" style ={{textDecoration:"none"}}>
          <h1 style={{marginLeft:"2rem",color:"#1158c7"}}>Favourites</h1>
        </Link> 
            
        </div>
    )
  }
}
