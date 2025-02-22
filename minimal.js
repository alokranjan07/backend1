import express from 'express'
const app = express();

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ message: 'Test route is working!' });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


//code
const registerUser = asyncHandler(async (req, res, next) => {
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
  
  export { registerUser };
  