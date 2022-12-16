const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./conn");
const { path } = require('./app');

dotenv.config({path:"server/config.env"})

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})