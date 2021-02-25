const {Router} = require('express')
const User = require('../models/User')
const Image = require('../models/Image')
const multer = require('multer')
const router = Router()

const upload = multer({dest: './uploads/'});

router.get('/profile/:login', async (req, res) => {
    const user = await User.findOne({login: req.params.login}).populate(
        'friends.friendId posts.postId posts.userCreate',
        'login name surname profilePhoto description photos user liked'
    )

    res.json({
        user: user
    })
})

router.get('/login', async (req, res) => {
    const user = await req.session
    if (user.isAuthenticated) {
        const userS = await User.findOne({_id: user.user._id}).populate(
            'friends.friendId groups.groupId',
            'login name surname profilePhoto groupPhoto name description pathname followers groupPhotos'
        )
        res.json({
            user: userS,
            message: true
        })
    } else if (!user.isAuthenticated) {
        res.json({message: false}).status(400)
    }
})

router.post('/setting', upload.single('file'), async (req, res) => {
    const file = await req.file
    const image = new Image({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        size: file.size
    })

    await image.save()

    res.json({message: 'Успешно!'})
});

router.post('/login', async (req, res) => {
    const {login, password} = await req.body
    const candidate = await User.findOne({login: login})

    if (candidate) {
        const verification = candidate.password === password

        if (verification) {
            req.session.user = candidate
            req.session.isAuthenticated = true
            req.session.save((err) => {
                if (err) throw err
            })
            res.json({message: 'Успешно зашли!'}).status(200)
            console.log('Успешно зашли!')
        } else {
            res.json({message: "Данные не правильные!"}).status(400)
            console.log('Данные не правильные!')
        }
    } else {
        res.json({message: "Такого пользователя нету!"}).status(404)
    }
})

router.post('/register', async (req, res) => {
    const {name, surname, login, password, email, birthDay} = await req.body
    const user = new User({
        name,
        surname,
        login,
        password,
        email,
        birthDay
    })

    if (name && surname && login && password && email) {
        const candidateLogin = await User.findOne({login: login})
        const candidateEmail = await User.findOne({email: email})

        if (candidateEmail || candidateLogin) {
            res.json({message: "Такой пользователь уже существует"}).status(404)
        } else {
            await user.save()
            res.json({message: "Пользователь создан"}).status(200)
        }
    } else {
        res.json({message: 'Заполните все поля'})
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.json({message: 'Успешно вышли!'})
    })
})

module.exports = router