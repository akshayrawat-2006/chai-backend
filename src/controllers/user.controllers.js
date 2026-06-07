// helper file already made in utils asyncHandler.js ->iska fyada yeh ki har cheej ko promises,try-catch me nhi dalna pdega 
import { asyncHandler } from "../utils/asyncHandler.js";

// making of controller method 
const registerUser = asyncHandler( async (req,res) => {
    res.status(200).json({ // return not used bec already sends the response to the client.
        message:"Ok"
    })
});


export {registerUser} // register default nhi hai yani ->registerUser naam se hi import krna hoga 
// agr register default hai toh naam change krke bhi import kar skte hai 