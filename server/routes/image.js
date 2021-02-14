const {Router} = require('express')
const Image = require('../models/Image')
const router = Router()

router.get('/:id', async (req, res) => {
    const image = await Image.findOne({_id: req.params.id})

    res.json(image)
})

module.exports = router