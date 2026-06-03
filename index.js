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