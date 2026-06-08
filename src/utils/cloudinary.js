import {v2 as cloudinary} from "cloudinary" // give v2 a name = cloudinary

import fs from "fs" // fs -> file sysytem
//👉 for removing file -> we have to unlink it 

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath)  return null;

            //upload file on cloudinary 
          const responce =   await cloudinary.uploader.upload(localFilePath, {
                resource_type:"auto" // khud detect kar lo jo bhi file aa rhi hai
            })

            //file uploaded successfully 
            // console.log("file is uploaded on cloudinary :", responce.url);
            fs.unlinkSync(localFilePath) // file uploaded so remove it 


            return responce
            
        } catch (error) {        //upload nhi hua par server par(bec localFilePath aaya hai) hai->so uss file ko server se hta do vrna bohot sari corrupted file server pe reh jaygi

            fs.unlinkSync(localFilePath) // remove the locally saved temp file as op of upload got failed 
            return null
        }
    }

export {uploadOnCloudinary}

