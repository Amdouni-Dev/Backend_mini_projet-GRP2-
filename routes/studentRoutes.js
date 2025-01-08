const express=require('express')
const router=express.Router()
const studentController=require('../controllers/studentController')
// insertion==>post
router.post('/users',studentController.createUser)
// modification ==> put
router.put('/users/:id',studentController.updateUser)
router.get('/users',studentController.getStudents)
router.delete('/deleteUser/:id',studentController.deleteUser)
router.get('/getUserByFirstName',studentController.searchByfirstName)

module.exports=router