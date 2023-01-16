import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";
import API_KEY from "./secrets"

export default class List extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],// page array
            currPage:1,
            movies:[],
            fav_movies:[],
        }
    }   
      handleEnter = (id)=>{
        this.setState({
          hover:id
      })
      }

      handleLeave=()=>{
          this.setState({
            hover:"",
          });
      }


      changeMovies=async()=>{
        console.log(this.state.currPage);
        console.log("changeMovies called");
        let ans=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=652dc29c4141d5d68310e2175791d8e2&language=en-US&page=${this.state.currPage}`)
        this.setState({
          movies:[...ans.data.results]
        });
      }

      handlePrevious=()=>{
          if(this.state.currPage!=1){
            this.setState({
              currPage:this.state.currPage-1,
            },this.changeMovies);
          }  
      }

      handlePageNo=(pageNum)=>{
          this.setState({
            currPage:pageNum,
          },this.changeMovies);
      }
      handleNext =()=>{
        let tempArr=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
          tempArr.push(i);//[1,2]
        }
        this.setState({
          parr:[...tempArr],
          currPage:this.state.currPage+1,
        } , this.changeMovies);
        
      };

  

      handleFavourites=(movieObj)=>{
        let localStorageMovies=JSON.parse(localStorage.getItem("movies"))||[];// string to array,
       // []-> means empty array if nothing in fav_movies

        if(this.state.fav_movies.includes(movieObj.id)){
          // removing
          localStorageMovies=localStorageMovies.filter(movie=>movie.id!=movieObj.id);
        }
        else{
          // here we have added all movie to fav_movies list 
          localStorageMovies.push(movieObj); 
        }
        console.log(localStorageMovies);
        localStorage.setItem("movies",JSON.stringify(localStorageMovies));
      
        let tempData=localStorageMovies.map(movieObj=>movieObj.id);
        this.setState({
          fav_movies:[...tempData],
        });
      }

    async componentDidMount(){
        let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=652dc29c4141d5d68310e2175791d8e2&language=en-US&page=${this.state.currPage}`)
        this.setState({
          movies:[...res.data.results]
        })
    }   
    
  render() {
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : 
        (
          <div className="listbackground">
            <h3 className="text-center">
              <strong>Trending Movies</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div className="card movie-card" 
                onMouseEnter={()=>{this.handleEnter(movieObj.id)} }
                onMouseLeave={this.handleLeave}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                    style={{ height: "40vh", width: "20vw" }}
                  />
                
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                
                  <div className="button-wrapper">
                    {
                      this.state.hover==movieObj.id && 
                      <a  class="btn btn-danger movie-button" onClick={()=>{this.handleFavourites(movieObj)}}>
                        {this.state.fav_movies.includes(movieObj.id)?"Remove from Favourites":"Add to Favorites"}
                      </a>
                    }
                    
                  </div>
                </div>
              ))}
            </div>

            <div className="pagenation">
                  <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link"  onClick={this.handlePrevious}>Previous</a>
                      </li>
                      {
                        this.state.parr.map((pageNum)=>(
                          <li class="page-item"><a class="page-link" onClick={()=>{this.handlePageNo(pageNum)}}>
                            {pageNum}
                          </a>
                          
                          </li>
                        
                      ) )}
                    
                    <li class="page-item">
                      <a class="page-link" onClick={this.handleNext} >Next</a></li>
                  </ul>
                </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}