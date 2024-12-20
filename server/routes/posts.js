import { Router } from 'express'
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// create post
// http://localhost:3002/api/posts
router.post('/', checkAuth,  createPost)

// get all posts
// http://localhost:3002/api/posts
router.get('/', getAll)

// get post by id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// get my posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// delete post 
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// update post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// get post comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router