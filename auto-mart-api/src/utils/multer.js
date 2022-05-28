const multer  = require('multer');
// const uuid = require('uuid').v4;

//this handles the destination and filename for saving the file
const localStorage = multer.diskStorage({

  destination: (req, file, callback) => {
      callback(null, './public/uploads/cars');
  },
  
  filename: (req, file, callback) => {
    callback(null, `${ (file.originalname.split(".")[0]).replaceAll(" ", "_") }.${file.extension}`);
  }
});

//this checks the uploaded filetype 
const photoFilter = (req, file, callback) => {

  let photoExt;

  if(file.mimetype) {
    //checking the file extension to append the appropriate one to filename
    switch(file.mimetype) {
      case 'image/png':
        photoExt = 'png';
        break;
      case 'image/jpg':
        photoExt = 'jpg';
        break;
      case 'image/gif':
        photoExt = 'gif';
        break;
      case 'image/jpeg':
        photoExt = 'jpeg';
        break;
      default :
      photoExt = null;
    }
  }

  if(!photoExt) {
    //set a validation error on the incoming request
    req.fileValidationError = 'wrong file type, select only images!';
    callback(null, false);
  } else{
    file.extension = photoExt;
    callback(null, true);
  }
};

const uploadLocal = multer({ storage: localStorage, fileFilter: photoFilter });

module.exports = { uploadLocal };