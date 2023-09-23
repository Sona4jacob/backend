const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    try{
//   access token from header
const token =req.headers['access_token']

// responce may be true or fslse
jwt.verify(token,"securitykey123")

next()
    }
    catch{
      res.status(401).json({
        status:false,
        message:"Please Login",
        statusCode:401
      })
    }
}

module.exports={jwtMiddleWare}