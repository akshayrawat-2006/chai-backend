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


// LECTURE: 9
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

// 👉👉👉👉
//  Client Request
//       ↓
// Middleware
// (cors, cookieParser, auth)
//       ↓
// Route
//       ↓
// Controller
// (asyncHandler wraps it)
//       ↓
// Database
// (MongoDB)
//       ↓
// Success?
//    /       \
//  Yes        No
//  ↓          ↓
// ApiResponse ApiError
//  ↓          ↓
// Client receives response



// LECTURE:10
// models -> user.models.js ,video.model.js

// 👉👉Login
//   ↓
// Access Token (15 min)
// Refresh Token (7 days)
//   ↓
// Access Token Expires
//   ↓
// Send Refresh Token
//   ↓
// Server verifies
//   ↓
// Generate New Access Token
//   ↓
// Continue using app


//Use special mongoose package ->
// mongoose aggregate paginate : use in video file and below 2 in user file
// bcrypt : used to hash passwords before storing them in the database.
// jsonWbeToken(jwt) :JWT (JSON Web Token) is a secure token used for authentication, JWT 3 parts:Header(algo & tooken type).Payload(data).Signature

// pre middleware ->runs before a specific Mongoose operation.



// LECTURE 11:
//package: multer and express-fileupload are almost same-> we use multer

// install cloudinday

//👉 multer ke use se user se file lenge phir usse temporary apne local storage par rakh denge 
// phir cloudinary ki madad se local storage se file lenge aur server par daal denge

// utlits -> cloudnary.js

// MAKE middleware using multer(Multer = File Upload Middleware) -> see on gpt 



// LECTURE 12(HTTP ): protocol for communication b/w👉 Browser ↔ Server
// HyperText Transfer Protocol(http) -> Browser             ->❌ Not secure. bec Anyone intercepting the network can read it.
                                        // ↓
                                        // Username: Akshay
                                        // Password: 123456
                                        // ↓
                                        // Server

//https ->hyperText Transfer Protocol Secure : Data is encrypted
// Browser         ->Even if someone intercepts the data:ajd8s7d9a8sd7a9s... ->can't understand it hence ✅ Secure.
//    ↓
// Encrypted Data
//    ↓
// Server     

// URI (Uniform Resource Identifier) is a generic identifier for a resource.
// URL (Uniform Resource Locator) is a type of URI that specifies the location of a resource and how to access it.
// URN (Uniform Resource Name) is a type of URI that uniquely identifies a resource by name without specifying its location.

// http request bhej rhe ho toh sath me kuch information bhi bhejni pdti hai jaise file bhejto ho toh filename,filesize,filecreated when etc(👉this is metadata)
//👉 HTTP Headers are key-value extra information (metadata) sent along with an HTTP Request or Response.
// used for caching,authenication ,manage-state(is userloggedin?)

// 👉2012 se phele X-preffix lgana hota tha

// Types of headers(can many more):-
// Request Headers : Sent by client → server.
// Response Headers : Sent by server → client.
// Representation Headers :describe how data is represented including its👉 format, encoding, and compression.
// Payload(data) Headers : describe the payload (data) of the message


// 👉 Most Common HTTP Headers
// Accept:
// Client server ko batata hai ki mujhe kis type ka response chahiye
// Example:Accept: application/json

// User-Agent:
// Batata hai request kis application/browser/device se aayi hai
// Example:User-Agent: Chrome/138.0.0

// Authorization:
// User ki identity verify karne ke liye token/credentials bhejte hain
// Example:Authorization: Bearer JWT_TOKEN

// Content-Type:
// Request body ka format batata hai
// Example:Content-Type: application/json
// Content-Type: multipart/form-data (file upload)

// Cookie:
// Browser se server ko stored cookies bhejta hai
// Example; Cookie: accessToken=abc123

// Cache-Control:     (  👉Cache = Fast Temporary Memory)
// Browser/proxy ko batata hai response cache karna hai ya nahi
// Example:Cache-Control: no-cache
// Cache-Control: max-age=3600

// 👉Some headers which can be use in production based company :- 
// CORS Headers:-
// Access-Control-Allow-Origin -> Kon API access kar sakta hai
// Access-Control-Allow-Credentials -> Cookies allow hain ya nahi
// Access-Control-Allow-Methods -> Allowed HTTP methods

// Security Headers:-
// Cross-Origin-Embedder-Policy (COEP)-> Controls which external resources can be embedded
// Cross-Origin-Opener-Policy (COOP) ->Isolates browser tabs/windows from other origins
// Content-Security-Policy (CSP)->Controls allowed scripts, images, styles etc.
// X-XSS-Protection -> Browser-level XSS protection


//👉 HTTP Methods:- 
// GET    → Get Data
// POST   → Create Data
// PUT    → Replace Entire Data
// PATCH  → Update Some Data
// DELETE → Delete Data

// HEAD   → GET jaisa hi, but sirf headers return karta hai, body nahi.
// OPTIONS→ Server se poochta hai ki kaunse methods allowed hain.
// TRACE(loopback test:)  → Debug Request 

// 👉HTTP Status Code:-
// 1xx → Information
// 2xx → Success
// 3xx → Redirection
// 4xx → Client Error
// 5xx → Server Error

//Standard some HTTP code :-Mostly used in MERN stack ( can be different acc to company )
// 200 → Everything OK
// 201 → Created
// 400 → Client sent wrong data
// 401 → Not logged in
// 404 → Not found
// 500 → Server crashed
// 504 → Server too slow


//👉 Lecture 13: Router and controlling with debugging 
// controllers -> user.controllers.js -> make method 
// now to run method make URL->jb URL hit hoga method run hoga  -> 👉 URL ke liye (sare routes ke liye routes folder bnaya hai  )
// user.router ,user.controller ko export kar do ->inko import karo mostly app.js(bec it is almost empty )

// for api testing ->can use thunderClient(vs code pluggin),, 👉👉postman 
// post man -> me collection pe jao ->plus pe click karo ->url http://localhost:8000/api/v1/users/register enter karo POST select karo -> then send


// 👉Lecture 14: Logic Building :ek problem ko choti problem me batke solve krna 
// user.controllers.js->registerUser krne ke step socho 


// 👉Lecture 15: using postman for backend 
// 
// postman ->body ->form data bec json me file nhi bhej skte 

// now when all thing done -> go to cloudinary.js -> file unlink the uploaded file 

//postman -> colletion  -> make collection 
// then set environemtn -> for not using http://localhost:8000/api/v1/ all time -> change noenvironetn at top to youtubechai


// 👉Lecture 16:Access Refresh,Middleware and cookies in Backend 

// user.controllers.js -> login ka code likha 
// phir logout-> ke liye auth.middleware.js -> route


// 👉Lecture 17:Acces token and Refresh Token in backend 
// user.controllers.js ->frontend ko yeh bolenge ki jab accesstoken expire ho jaye(401 req jaygi) toh code likho ki jb 401 req aaye-> tab dubara login karane ki bjay -> access token refresh kralo 
// aab req ke andar refresh token bhi bheji hai phir uss refresh token ko aur jo db me refresh token hai usse compare karaya  ->if same then only give access token 

// then go to user.routes.js

// 👉Hw:-write article on refress,access token on platforms(👉eg:hashnode)

// 👉Lecture 18:Writing update controllers for users
//https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj-> subscriptions ->chanel aur subscriber dono user hai 
// models ->subscription.models.js

// user.controllers.js






