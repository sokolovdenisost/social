const {Router} = require('express')
const Group = require('../models/Group')
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

router.get('/:pathname', async (req, res) => {
    const group = await Group.findOne({pathname: req.params.pathname}).populate(
        'administrator followers.followerId groupPosts.userCreate groupPosts.postId',
        'login name surname profilePhoto description photos user liked'
    )
    const user = await User.findOne({_id: req.session.user._id})

    if (group) {
        const checkSubscribe = group.followers.filter(g => g.followerId._id.toString() === user._id.toString())

        if (checkSubscribe.length > 0) {
            res.json({
                message: 'Отписаться',
                group
            })
        } else if (checkSubscribe.length === 0) {
            res.json({
                message: 'Подписаться',
                group
            })
        }
    }
})

router.post('/create', async (req, res) => {
    const {groupPhoto, name, description, pathname} = await req.body
    const checkGroup = await Group.findOne({pathname: pathname})
    const user = await User.findOne({_id: req.session.user._id})

    if (checkGroup) {
        res.json({message: 'URL такой уже занят'})
    } else if (!checkGroup) {
        const group = new Group({
            groupPhoto,
            name,
            description,
            pathname,
            administrator: user
        })

        group.followers.push({
            followerId: user
        })

        user.groups.push({
            groupId: group
        })

        await group.save()
        await user.save()

        res.json({message: 'Группа успешно создана'})
    }
})

router.post('/subscribe', async (req, res) => {
    const {_id} = await req.body
    const group = await Group.findOne({_id: _id})
    const user = await User.findOne({_id: req.session.user._id})

    console.log(_id)

    const checkSubscribe = group.followers.filter(g => g.followerId.toString() === user._id.toString())

    if (checkSubscribe.length > 0) {
        const idxGroup = group.followers.findIndex(g => g.followerId.toString() === user._id.toString())
        const idxUser = user.groups.findIndex(g => g.groupId.toString() === group._id.toString())

        group.followers.splice(idxGroup, 1)
        user.groups.splice(idxUser, 1)

        await group.save()
        await user.save()

        res.json({message: 'Отписаться'})
    } else if (checkSubscribe.length === 0) {
        group.followers.push({
            followerId: user
        })

        user.groups.push({
            groupId: group
        })

        await group.save()
        await user.save()

        res.json({message: 'Подписаться'})
    }
})

router.post('/:pathname/post', async (req, res) => {
    const {description, photos} = await req.body
    const group = await Group.findOne({pathname: req.params.pathname})
    const user = await User.findOne({_id: req.session.user._id})

    if (group.private.access) {
        if (photos.length > 0) {
            const post = new Post({
                user,
                description,
                photos
            })

            group.groupPosts.push({
                postId: post,
                userCreate: user
            })

            await post.save()
            await group.save()

            res.json({message: 'Пост создан с картинками'})
        } else if (photos.length === 0) {
            const post = new Post({
                user,
                description
            })

            group.groupPosts.push({
                postId: post,
                userCreate: user
            })

            await post.save()
            await group.save()

            res.json({message: 'Пост создан без картинок'})
        }
    }
})

module.exports = router