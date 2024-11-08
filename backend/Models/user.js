const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3, 
        maxlength: 20 
    },
    email:{
        type:String,
        required: [true, 'Please provide an email'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    }

});

const userModel=mongoose.model('Users',userSchema);
module.exports=userModel;