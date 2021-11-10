import axios from 'axios'
import React,{useEffect,useState} from 'react'
import "./Favorite.css?after"
import {Button ,Popover} from 'antd'
import {IMAGE_BASE_URL} from '../../../Config'
function FavoritePage(props) {

    const[Favorite,setFavorite] = useState([])

    useEffect(()=>{
        fetchFavoriteMovie()

    },[])

    const fetchFavoriteMovie = () => {
        axios.post('/api/favorite/getFavoriteMovie',{userForm:localStorage.getItem('userId')})
        .then(response =>{
            if(response.data.success){
                setFavorite(response.data.favorites)
            }else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })

    }
 

    const onClickDelete = (movieId, userFrom) => {

        const variable = {
            movieId,
            userFrom
        }

        axios.post('/api/favorite/removeFromFavoriteMovie',variable)
        .then(response =>{
            if(response.data.success){
                fetchFavoriteMovie()
                console.log("삭제되었습니다")
               
            }else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })

    }


    const renderCards = Favorite.map((favorite, index) =>{
        const content = (
                <div>
                    {favorite.moviePost ?
                        <img src= {`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"} 
                    
                    
                </div>
            )

            
        return(
                <tr key={index}>
                    <Popover content={content} title={`${favorite.movieTitle}`} >
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                    <td>{favorite.movieRunTime}분</td>
                    <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom) }>Remove</Button></td>
                 
                </tr>
            )
        })
        




    return (
        <div style ={{width:'85%', margin:'3rem auto'}}>
            <h2>
                Favorite Movies
            </h2>
            <hr/>
           

            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th style={{width:'40%'}}>Movie Title</th>
                        <th style={{width:'40%'}}>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
           
                    { renderCards}

                <tbody>
                   
                </tbody>
                 
            </table>
        </div>
    )
}

export default FavoritePage
