import userModel from "../models/userModel.js";

export const getUserData = async (req,res)=>{
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false, message:"User not found"});
        };
        res.json({
            
            success:true,
            userData: {
                name:user.name,
                isAccountVerified:user.isAccountVerified
            }
        
        });

    }catch(error){
        res.json({success:false, message:error.message});
    }
}