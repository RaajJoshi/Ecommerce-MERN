const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./conn");
const { path } = require('./app');
const PORT = process.env.PORT || 4000;

dotenv.config({path:"server/config.env"})

connectDatabase();

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})