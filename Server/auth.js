const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./conn");
const { path } = require('./app');
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 4000;

dotenv.config({path:"server/config.env"})

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})