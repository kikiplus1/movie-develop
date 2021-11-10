import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button, Card } from 'antd';
import axios from 'axios';
import Comments from './Comment/Comment';
// import { SidePost } from './Comment/SidePost'

function PostDetailPage(props) {

    const postId = props.match.params.postId
    const [CommentLists, setCommentLists] = useState([])
    const [Posts, setPosts] = useState([])

    const variable = {
        postId: postId
    }

    useEffect(() => {
        axios.post('/api/post/getPosts', variable)
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.post)
                    
                } else {
                    alert('비디오 정보를 가져오길 실패하였습니다.')
                
                }console.log(Posts)
            })

        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments )
                    console.log("댓글들",response.data.comments )
                } else {
                    alert('댓글을 가져오는데 실패하였습니다.')
                }
            })

        


    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if (Posts.writer) {
        const removePostButton = Posts.writer._id == localStorage.getItem('userId') 
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={18}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>

                        <List.Item
                            actions=
                            {[<Button postId={postId} userId={localStorage.getItem('userId')}  />, 
                              removePostButton]}
                        >
                            <Card style={{width:'1900px', height:'500px'}}>
                            <List.Item.Meta
                                title={<b><h1>{Posts.title}</h1></b>}
                                description={Posts.writer.name}
                            />
                            <br/><hr/><br/>
                            <h3>{Posts.content}</h3>
                            <div></div>
                           
                            </Card> 
                        </List.Item>
                        <Comments CommentLists={CommentLists} postId={Posts._id} refreshFunction={updateComment} />

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    {/* <SidePost /> */}

                </Col>
            </Row>
        )

     } else {
            return (
             <div>Loading...</div>

         )
     }


 }

export default PostDetailPage