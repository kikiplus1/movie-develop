import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Icon from '@ant-design/icons';
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';

const { Title } = Typography
const { Meta } = Card;

function PostPage() {

    const [posts, setposts] = useState([])

    useEffect(() => {
        axios.get('/api/post/bringPosts')
            .then(response => {
                console.log('게시글 로딩중')
                if (response.data.success) {
                    console.log(response.data.posts)
                    setposts(response.data.posts)
                } else {
                    alert('게시글 로딩에 실패하였습니다.')
                }
            })
    }, [])

    const renderCards = posts.map((post, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <a href={`/post/${post._id}`}>
            g<Card
                hoverable
                style={{ width: 400, marginTop: 4 }}
                actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="edit" key="edit" />,
                     <Icon type="ellipsis" key="ellipsis" />,
                ]}
            >
                <Meta
                    description={post.writer.name}
                    title={post.title}
                    content = {post.content}
                    

                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </Card>
            </a>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> 게시판 </Title>
            <Button type="primary" size="large" href='/post/createpost'>
                    게시글 쓰기
                </Button>
            <Row gutter={[32, 32]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default PostPage