const Router = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()

router.post('/create', async (req, res) => {
    const {description, photos, id} = await req.body
    const current = await User.findOne({_id: id})
    const user = await User.findOne({login: req.session.user.login})

    if (photos) {
        const post = new Post({
            user,
            description,
            photos: {
                photoId: photos
            }
        })

        current.posts.push({
            userCreate: user,
            postId: post
        })

        await current.save()
        await post.save()

        res.json({message: 'Пост создан с картинками'})
    } else if (!photos) {
        const post = new Post({
            user,
            description
        })

        current.posts.push({
            userCreate: user,
            postId: post
        })

        await current.save()
        await post.save()

        res.json({message: 'Пост создан без картинок'})
    }
})

router.post('/like', async (req, res) => {
    const {id} = await req.body
    const post = await Post.findOne({_id: id})
    const user = await User.findOne({_id: req.session.user._id})

    const checkLike = post.liked.filter(l => l.likedId.toString() === user._id.toString())

    const postLikes = []
    const userLikes = []

    post.liked.forEach(p => postLikes.push(p))
    user.liked.forEach(p => userLikes.push(p))

    if (checkLike.length > 0) {
        const idxPost = postLikes.findIndex(p => p.likedId.toString() === user._id.toString())
        const idxUser = userLikes.findIndex(u => u.likedId.toString() === post._id.toString())

        post.liked.splice(idxPost, 1)
        user.liked.splice(idxUser, 1)

        await post.save()
        await user.save()

        res.json({message: 'Лайк убран'})
    } else if (checkLike.length === 0) {
        post.liked.push({
            likedId: user
        })

        user.liked.push({
            likedId: post
        })

        await post.save()
        await user.save()

        res.json({message: 'Поставили лайк'})
    }
})

module.exports = router