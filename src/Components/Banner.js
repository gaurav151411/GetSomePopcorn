import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Banner extends Component {
  render() {
    let movie=movies.results[2];
    return (
        <>  
              {/* //   if movie is not there then display spinner else display div  */}
           { movie == ""?( <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Loading...</span>
               
            </div>
            )  :
            (
            <div className="card banner-card" >
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top" alt="..."/>
                <div className="card-body banner">
                    <h5 className="card-title banner-title">{movie.original_title}</h5>
                    <p className="card-text banner-text" style={{color:"white"}}>{movie.overview}</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
            )
            } 
    
        
    
        </>
   
    )
  }
}
