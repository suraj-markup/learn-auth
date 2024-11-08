const router = require('express').Router();
const {signup,login,logout}=require('../Controllers/AuthControllers.js');

router.post('/login',login);
router.post('/signup',signup);
router.get('/logout',logout);

module.exports=router;