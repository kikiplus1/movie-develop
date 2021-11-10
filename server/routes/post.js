const express = require('express');
const router = express.Router();
const { Post } = require("../modele/Post");

const { auth } = require("../middleware/auth");
const multer = require("multer");

//=================================
//             게시물
//=================================



router.post("/createPost", (req, res) => {
    let post = new Post({ title:req.body.title, content: req.body.content, writer: req.body.userID });

    post.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })

  
});


router.get("/bringPosts", (req, res) => {
    Post.find()
        .populate("writer")
        .exec((err, posts) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts });
        });
});

router.post("/getPosts", (req, res) => {
    console.log(req.body)
    Post.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

module.exports = router;