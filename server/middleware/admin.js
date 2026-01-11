const jwt = require("jsonwebtoken")

const verifyAdminJWT = (req, res, next) => {
    if (req.user.role === "Admin"){
        console.log("in admin");
        next()
    }
     
    else return res.status(401).json({ Message: 'FFFFFFFFFF' })
}
module.exports = verifyAdminJWT
