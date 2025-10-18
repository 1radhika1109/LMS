import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
      let {token} = req.cookies
     
      if(!token){
        return res.status(401).json({message:"user doesn't have token"})  // ✅ Correct 401 status
      }
      let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
      
      if(!verifyToken){
        return res.status(401).json({message:"user doesn't have valid token"})  // ✅ Correct 401 status
      }
  
      req.userId = verifyToken.userId
      next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Invalid or expired token"})  // ✅ Better error message
    }
}

export default isAuth
