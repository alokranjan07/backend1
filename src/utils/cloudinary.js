import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
 
 

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    }); 
     
    const cloudinaryUpload= async  (localFilePath)=>{
    try{

        if(!localFilePath ) return null
        //upload on cloudinary
       const response =  await cloudinary.uploader.upload(localFilePath ,{
            resource_type:"auto"

        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        fs.unlikSync(localFilePath)
        console.log(response);
        return response;
        
    }catch(error){
        fs.unlinkSync(localFilePath)//remove the locally saved temporarily 
        // file  as the upload operation got failed
        return null;

    }


}
export  {cloudinaryUpload}