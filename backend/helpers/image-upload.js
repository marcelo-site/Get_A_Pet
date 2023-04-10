import multer from 'multer'
import path from 'path'

// destination images
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ''
        if (req.baseUrl.includes('users')) folder = 'users'
        else if (req.baseUrl.includes('pets')) folder = 'pets'

        cb(null, `public/img/${folder}`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname)
    }
})

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|JPG)$/)) {
            return cb(new Error('Por favor, envie apenas jpeg ou png.'))
        }
        return cb(undefined, true)
    }
})