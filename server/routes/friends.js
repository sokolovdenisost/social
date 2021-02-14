const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.get('/profile/:login', async (req, res) => {
    const current = await User.findOne({login: req.params.login})
    const user = await User.findOne({login: req.session.user.login})

    const userFollowers = []
    const currentFollowers = []

    const userFriends = []
    const currentFriends = []

    user.followers.forEach(f => userFollowers.push(f))
    current.followers.forEach(f => currentFollowers.push(f))

    user.friends.forEach(f => userFriends.push(f))
    current.friends.forEach(f => currentFriends.push(f))

    const checkUserFollowers = userFollowers.filter(f => f.followerId.toString() === current._id.toString())
    const checkCurrentFollowers = currentFollowers.filter(f => f.followerId.toString() === user._id.toString())

    const checkUserFriends = userFriends.filter(f => f.friendId.toString() === current._id.toString())
    const checkCurrentFriends = currentFriends.filter(f => f.friendId.toString() === user._id.toString())

    if (checkUserFollowers.length > 0) {
        res.json({message: 'Добавить в друзья'})
    } else if (checkCurrentFollowers.length > 0) {
        res.json({message: 'Отменить заявку'})
    } else if (checkCurrentFriends.length > 0 && checkUserFriends.length > 0) {
        res.json({message: 'Удалить из друзей'})
    } else if (current.login === user.login) {
        res.json({message: 'Это ваш аккаунт'})
    } else if (checkUserFriends.length === 0 && checkUserFollowers.length === 0 && checkCurrentFriends.length === 0 && checkCurrentFollowers.length === 0) {
        res.json({message: 'Отправить заявку'})
    }
})

router.post('/add', async (req, res) => {
    const {_id} = await req.body
    const user = await User.findOne({login: req.session.user.login})
    const current = await User.findOne({_id: _id})

    const userFollowers = []
    const currentFollowers = []

    const userFriends = []
    const currentFriends = []

    user.followers.forEach(f => {
        if (!f) {
            return false
        } else {
            return userFollowers.push(f)
        }
    })
    current.followers.forEach(f => {
        if (!f) {
            return false
        } else {
            return currentFollowers.push(f)
        }
    })

    user.friends.forEach(f => userFriends.push(f))
    current.friends.forEach(f => currentFriends.push(f))

    const checkUserFollowers = userFollowers.filter(f => f.followerId.toString() === current._id.toString())
    const checkCurrentFollowers = currentFollowers.filter(f => f.followerId.toString() === user._id.toString())

    const checkUserFriends = userFriends.filter(f => f.friendId.toString() === current._id.toString())
    const checkCurrentFriends = currentFriends.filter(f => f.friendId.toString() === user._id.toString())

    if (current._id.toString() === user._id.toString()) {
        res.json({message: 'Себя добавить невозможно'})
    } else if (current._id.toString() !== user._id.toString()) {
        if (checkUserFollowers.length === 0 && checkUserFriends.length === 0 && checkCurrentFollowers.length === 0 && checkCurrentFriends.length === 0) {
            current.followers.push({
                followerId: user._id
            })

            await current.save()

            res.json({message: 'Отправили заявку!'})
        } else if (checkCurrentFollowers.length > 0) {
            const idx = currentFollowers.findIndex(f => f.followerId.toString() === user._id.toString())

            current.followers.splice(idx, 1)

            await current.save()

            res.json({message: 'Убираем заявку!'})
        } else if (checkUserFollowers.length > 0 && checkCurrentFriends.length === 0) {
            const idx = userFollowers.findIndex(f => f.followerId.toString() === current._id.toString())

            user.followers.splice(idx, 1)

            user.friends.push({
                friendId: current._id
            })

            current.friends.push({
                friendId: user._id
            })

            await user.save()
            await current.save()

            res.json({message: 'Добавить в друзья'})
        } else if (checkUserFriends.length > 0 && checkCurrentFriends.length > 0) {
            const idxUser = userFriends.findIndex(f => f.friendId.toString() === current._id.toString())
            const idxCurrent = currentFriends.findIndex(f => f.friendId.toString() === user._id.toString())

            user.friends.splice(idxUser, 1)
            user.followers.push({
                followerId: current._id
            })

            current.friends.splice(idxCurrent, 1)

            await user.save()
            await current.save()

            res.json({message: 'Удалить из друзей'})
        }
    }
})

module.exports = router