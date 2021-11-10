import React, {useEffect, useState} from 'react'
import axios from 'axios';
function SidePost() {

    const [SidePosts, setSidePosts] = useState([])

    useEffect(() => {
        axios.get('/api/post/bringPosts')
            .then(response => {
                if (response.data.success) {
                    setSidePosts(response.data.post)
                } else {
                    alert('사이드 포스트를 가져오는데 실패하였습니다.')
                }
            })
        

    }, [])

    const SidePostsItem = SidePosts.map(( post, index) => {
       return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width:'50%' }}>
            <a href={`/post/${post._id}`} style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{post.title}  </span><br />
                <span>{post.writer.name}</span><br />
            </a>
        </div>
    </div>
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {SidePostsItem}


        </React.Fragment>
        
       
    )
}

export default SidePost