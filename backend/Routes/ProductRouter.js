const {ensureAuthenticated} = require('../Middleware/Auth');
const router= require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('-----logged In user details-----', req.user);
    res.status(200).json([
        {
            name:'mobile',
            price:1000,
        },
        {
            name:'tv',
            price:10000,
        },
        {
            name:'laptop',
            price:50000,
        },
        {
            name:'pc',
            price:100000,
        },
    ])
});

module.exports=router;