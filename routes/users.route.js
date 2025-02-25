const express = require('express')
const { getAllUsers, getSingleUser, updateUser, deleteUser, updateUserPassword } = require('../controllers/users.controller')
const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/showMe').get()
router.patch('/updateUser', updateUser)
router.patch('/updatePassword', updateUserPassword)
router.route('/:id').get(getSingleUser).delete(deleteUser)

module.exports = router 