const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const ctrls = require('../controllers/blog')

router.get('/', ctrls.getBlogs)
router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.post('/like', [verifyAccessToken], ctrls.likeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)

module.exports = router