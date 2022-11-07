const router = require('express').Router();
const { Post, User } = require('../models');
const authLogIn = require('../utils/authLogIn');

router.get('/', authLogIn, async (req, res) => {
    const postData = await Post.findAll();
    //makes array of serialized clean data
    const posts = postData.map(post => post.get({plain: true}))
    
    res.render("homepage", {posts, logged_in:req.session.logged_in});
})

router.get('/login', async (req, res) => {
    res.render("login");
})

router.get('/profile', authLogIn, async (req, res) => {
    //getting user data from db
    //the users id is in the request.session
    const userData = await User.findByPk(req.session.user_id, {include: [{model: Post}]})
    const user = userData.get({plain:true})

    //... spreads the user data?
    res.render("profile", {...user});
})

router.get('/post/:id', authLogIn, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {include:[{model: User}]})
    const post = postData.get({plain:true});

    res.render("post", {...post});
})

module.exports = router;