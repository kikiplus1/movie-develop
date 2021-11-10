import React, { useEffect, useState } from 'react'
import Icon from '@ant-design/icons';
import { Typography, Button, Form, message, Input } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;


function CreatePage(props) {
    const user = useSelector(state => state.user);

    const [content, setContent] = useState("")
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }
    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }



    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userData && !user.userData.isAuth) {
            return alert('로그인 먼저 해주세요');
            props.history.push('/login')

        }

        const variables = {
            title: title,
            content: content,
            userID: user.userData._id
        }

        axios.post('/api/post/createPost', variables)
            .then(response => {
                console.log("작성하기")
                if (response.data.success) {
                    console.log("작성완료")
                    message.success('게시물 작성이 완료되었습니다.');

                    setTimeout(() => {
                        props.history.push('/post')
                    }, 2000);
                }
                else {
                    alert("게시물 업로등에 실패하였습니다.")
                }
    })}


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} > 게시글 작성하기 </Title>
            </div>

            <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    style ={{heigh:"50%"}}
                    onChange={handleChangeDecsription}
                    value={Description}
                />
                <br /><br />

          

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem' }}>
                <Button type="primary" size="large" onClick={onSubmit}>
                    작성하기
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePage