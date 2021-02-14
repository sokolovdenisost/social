const {Schema, model} = require('mongoose')

const Post = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: [
        {
            photoId: {
                type: String
            }
        }
    ],
    comments: [
        {
            commentId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            commentDescription: {
                type: String,
                required: true
            }
        }
    ],
    liked: [
        {
            likedId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
})

module.exports = model('Post', Post)