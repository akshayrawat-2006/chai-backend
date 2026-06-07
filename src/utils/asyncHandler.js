// Every controller needs:try-catch Repeatedly
// by using this file -> No need to write:try-catch everywhere


// USING PROMISE
// asyncHandler(myFunction)       
//         ↓
// returns wrapper function  (👉so return statement is important)
//         ↓
// registerUser gets that function
//         ↓
// router uses registerUser
const asyncHandler = (requentHandler) => {
  return (req,res,next) =>{
    Promise.resolve(requentHandler(req,res,next)).catch((err) => next(err))
   }  
}

export {asyncHandler}

// USING TRY-CATCH
// const asyncHandler=(fn) => async (req,res,next) =>{       //asyncHandler -> higher order func(takes another function as input.)
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message: error.message
//         })
//     }
// }    


 

