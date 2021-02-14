const {Schema, model} = require('mongoose')

const Group = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pathname: {
        type: String,
        required: true
    },
    groupPhoto: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0mnE4D9TidaoBb3jl16HKK0CH5-Nw1oZ9Q&usqp=CAU'
    },
    groupPhotos: [
        {
            groupPhotoId: {
                ref: 'Group',
                type: Schema.Types.ObjectId
            }
        }
    ],
    followers: [
        {
            followerId: {
                ref: 'User',
                type: Schema.Types.ObjectId
            }
        }
    ],
    groupPosts: [
        {
            postId: {
                ref: 'Group',
                type: Schema.Types.ObjectId
            }
        }
    ],
    administrator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Group', Group)