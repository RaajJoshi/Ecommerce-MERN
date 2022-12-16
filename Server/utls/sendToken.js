const sendToken = (Farmer,statusCode,res) => {
    const token = Farmer.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("tokens",token,options).json({
        success:true,
        Farmer,
        token,
    });
};

module.exports = sendToken