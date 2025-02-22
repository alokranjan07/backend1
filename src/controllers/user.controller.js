 import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apierror.js';
import { User} from "../models/user.model.js"
import {cloudinaryUpload} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/apiResponse.js'
const registerUser = asyncHandler(async (req, res, next) => {

  //data 
    const { fullName, email, username, password } = req.body;
    console.log("email", email);
  
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "all fields are required");
    }
  
    const existedUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existedUser) {
      throw new ApiError(409, "user already registered");
    }
  
    // From multer gives req.files already added in routes that provides this properties
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
    if (!avatarLocalPath) {
      throw new ApiError(400, "avatar file is required");
    }
  
    const avatar = await cloudinaryUpload(avatarLocalPath);
    const coverImage = await cloudinaryUpload(coverImageLocalPath);
  
    if (!avatar) {
      throw new ApiError(400, "avatar file is required");
    }
  
    // Await the creation of the user
    const createdUser = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    });
  
    // Retrieve the user using the correct id from createdUser
    const createUser = await User.findById(createdUser._id).select("-password-refreshToken");
    if (!createUser) {
      throw new ApiError(500, "something went wrong while registering the user");
    }
  
    return res.status(201).json(
      new ApiResponse(200, createUser, "user registered successfully")
    );
  });


  const loginUser =asyncHandler (async(req,res,next)=>{

    //req body data
    //check username and email
    //find the user
    //check the password
    //password check
    //access and refresh token
    //send secure cookies
     const {email,username,password}= req.body

     if(!username || !email){
      throw new ApiError(400,"username or email password is required")

     }
     const user= await User.findOne({
      $or: [{username},{email}]
     })

     if(!user){
      throw ApiError(404,"user doesnt Exist")
     }

     const isPasswordvalid=await user.isPasswordCorrect
     if(!isPasswordvalid){
      throw ApiError(404,"password is invaild")
     }

    

  });
  
  export { registerUser };
  