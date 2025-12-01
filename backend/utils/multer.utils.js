import multer from 'multer';
import cloudinary from './cloudinary.utils.js';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profiles',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => {
      return `${uuidv4()}-${file.originalname}`;
    },
  },
});

const parser = multer({ storage });
export default parser;
