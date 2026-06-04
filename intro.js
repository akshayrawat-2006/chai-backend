// For data model -> https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj

// 1) npm init
// 2)git init
// 3)git add .
// 4)git commit -m "add initial files for backend"
// 5)git branch -M main     -> rename branch name to main(see on bottom line 2 icon)
// 6)git remote add origin https://github.com/akshayrawat-2006/chai-backend.git -> isse git rep ko yeh pta hai ki push kha krna hai
// 7)git push -u origin main    ->git push:Local repository ka code GitHub par bhejo., origin:Remote repository ka naam.(upar wali statement se), main:Branch ka naam.

// --set-upstream ->Local main branch(Your Laptop/Mac) ko remote main branch(GitHub Repository) se link kar do.

// public -> temp (khali so can't push to github)
// for pushing this folder on github-> we create a file .gitkeep

// .gitignore ->jo files sensitive hai(jo puch nhi krni woh yha pe rkho)

// .env -> is in gitignore so not push 
// .env.sample file -> env me kya hai (humme btane ke liye create ki hai) yeh push ho jaygi

// make folder src

// import wali statemnt ke liye -> package me type module kardo 

// use nodemon -> for taki file jaise hi save ho server ko restart kar de -> download by dev dependency(main production me koi antar na aaye) ->npm i -D nodemon
// do changes in ->script "dev": "nodemon src/index.js"
// means:
// When I run "npm run dev",
// start my backend using nodemon so the server automatically restarts whenever I save code changes.

// now -> check git status -> those file note pushed pushed it -> git add .->git commit -m "setup project files part 1"->git push

// create folder in src->controllers(for functionality), db(database ka connection logic ke liye) , middlewares(koi code inbetween run karana hai toh ), models , routes, utils 

// install prettier(why) -> eg ek team member semicolon use krta hai ek nhi jb github pe puch krnge toh ->bohot sare conflict aate hai
// install by dev dependency -> npm i -D prettier
// ->isme file  bnani hoti hai ->.prettierrc , .prettierignore


// LECTURE: 8
// app.js me jao  -> then index.js me server connect karo using .then()

// install cookie parser, cors ->app.use() is used when jb middleware/configuation setting krni hai 

// middleware->jaise /instagram click kiya client ne phir response me "akshay" send kar diya ->aab jaise beech me kuch check karna ho eg:instagram login kar rkha hai ya nhi ->👉iss beech ki checking ko middleware khete hai
// 👉 sirf(req,res) nhi blki 4 cheeje hoti hai ->(err,req,res,next) :next ek flag hai jisse middleware1 kheta hai mera kam ho gya aab agle middleware2 pe jao

// db se bbat krne wale hai bar bar  -> db/index.js me connectDB wala func bar bar likhna hoga ->so kyon na ek utility file ban lu  -> asyncHandler.js
// asyncHandler = reusable helper function      ->utils folder:used to store -> Common helper functions,Utility functions,Reusable code


//make  ApiError file in utils ->APIs we also need:    HTTP Status Code
                                                    // Success Flag
                                                    // Custom Errors Array
                                                    // Stack Trace      So instead of using normal Error, we create our own Error class.

 // make we create ApiResponse for consistent successful responses. 
