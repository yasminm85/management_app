import multer from 'multer';

const uploadFile = multer({
  storage: multer.memoryStorage(), 
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF/DOC allowed'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3 // 3MB
  }
});

export default uploadFile;