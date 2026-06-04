// USING PROMISE
const asyncHandler = (requentHandler) => {
  return (req,res,next) =>{
    Promise.resolve(requentHandler(req,res,next)).catch((err) => next(err))
   }  
}

export {asyncHandler}

// USING TRY-CATCH
const asyncHandler=(fn) => async (req,res,next) =>{       //asyncHandler -> higher order func(takes another function as input.)
    try {
        await fn(req,res,next)
        
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message: error.message
        })
    }
}    


 

