const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const authRouter = require('./server/routes/auth')
const friendRouter = require('./server/routes/friends')
const postRouter = require('./server/routes/post')
const imageRouter = require('./server/routes/image')
const groupRouter = require('./server/routes/group')

const app = express()
const MONGODB_URI = `mongodb+srv://denis:admin@cluster0.kytic.mongodb.net/social`

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(express.json({limit: '50mb',type: "*/*"}))
app.use(express.static(__dirname + './uploads'));
app.use(express.urlencoded({limit: '50mb', extended: false}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use('/auth', authRouter)
app.use('/friend', friendRouter)
app.use('/post', postRouter)
app.use('/image', imageRouter)
app.use('/group', groupRouter)

const PORT = 3001

async function start() {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    app.listen(PORT, () => {
        console.log(`Server is starting in ${PORT} port...`)
    })
}

start()