const bcrypt=require('bcrypt');

const hashPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

const matchPassword=async (enteredPassword,hash)=>{
    return await bcrypt.compare(enteredPassword,hash);
}

module.exports={hashPassword, matchPassword};