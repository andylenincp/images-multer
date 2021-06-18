const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'public/images'})

// Initializations
const app = express()

// Settings
app.set('title', 'images-multer')
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.get('/', (req, res) => {
    res.render('index')
})
app.post('/upload', upload.single('imagen'), (req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
    res.json({message: 'Check image'})
})

app.post('/uploadmult', upload.array('imagenes'), (req, res) => {
    console.log(req.files)
    res.json({message: 'Muchas imágenes'})
})

// Server listen
app.listen(app.get('port'), () => {
    console.log(`${app.get('title')} listening at the port ${app.get('port')}`)
})