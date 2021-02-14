const {Schema, model} = require('mongoose')

const User = new Schema({
    login: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // birthDay: {
    //     type: Date,
    //     required: true
    // },
    photos: [
        {
            photoId: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    profilePhoto: {
        type: String,
        default: 'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg'
    },
    friends: [
        {
            friendId: {
                ref: 'User',
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
    following: [
        {
            followingId: {
                ref: 'User',
                type: Schema.Types.ObjectId
            }
        }
    ],
    groups: [
        {
            groupId: {
                ref: 'Group',
                type: Schema.Types.ObjectId
            }
        }
    ],
    posts: [
        {
            postId: {
                ref: 'Post',
                type: Schema.Types.ObjectId
            },
            userCreate: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    liked: [
        {
            likedId: {
                ref: 'Post',
                type: Schema.Types.ObjectId
            }
        }
    ]
})

module.exports = model('User', User)