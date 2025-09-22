const multer = require("multer");


const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Product-Images")
    },
    filename: (req, file, cb) => {
        cb(null, `Product-${Date.now()}`)
    }
})

const productsImg = multer({storage : imgUpload});
module.exports = productsImg;