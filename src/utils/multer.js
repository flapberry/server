import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDirectory = path.join(__dirname, '../images');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + req.filename + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

export const upload = multer({ storage }).array('images', 100);
export const uploadTopImg = multer({ storage }).array('topimg', 10);

