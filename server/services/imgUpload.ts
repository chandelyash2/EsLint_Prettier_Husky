import Multer from 'multer'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import sanitize from 'sanitize-filename'
import fs from 'fs'
const router = express.Router()

const fileStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `uploads`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, `${uuidv4()}_${sanitize(file.originalname)}`)
    } else {
      new Error('Only .png, .jpg and .jpeg format allowed!')
      file.filename
    }
  },
})
const upload = Multer({
  storage: fileStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10mb
})

router.post('/imgUpload', upload.array('files'), async (req: any, res) => {
  const files = req.files
  const filesUrl = files.map((item) => item.filename)
  res.json(filesUrl)
})

export default router
