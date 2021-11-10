
import React,{useEffect,useState} from 'react'
import { Row, Button } from 'antd';
import {API_URL , API_KEY, IMAGE_BASE_URL} from '../../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comment';
import {withRouter} from 'react-router-dom'
import axios from 'axios';

function MovieDetail(props) {

    let movieId = props.match.params.movieId 
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts]= useState([])
    const [ActorToggle,setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])
    const movieVariable = {
        movieId: movieId
    }

  
    useEffect(()=>{
        

        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })


        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)

        })
        
        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    },[])


   
        const toggleActorView = () =>{
            setActorToggle(!ActorToggle)
        }
        
        const updateComment = (newComment) => {
            setCommentLists(CommentLists.concat(newComment))
        }


    return (
        <div>
            {/* Header */}
            
     
              <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title ={Movie.original_title}
                text = {Movie.overview}
              />
            

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite movieInfo={Movie} MovieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
        

                {/* Movie info */}
                    <MovieInfo
                        movie={Movie}
                    />
                <br/>

                {/* Acter Grid */}    
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}> 출연진 보기 </Button>
                </div>
        

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast,index)=>(

                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    CharacterName = {cast.name}
                                    
                                    />

                            </React.Fragment>
                            
                        ))
                        }
                    </Row>}

                {/* 댓글 */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>
           
        </div>

    
    )
                
}
export default withRouter(MovieDetail)
