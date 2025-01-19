// working with mongo db
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
// const multer = require('multer');
const fileUpload = require('express-fileupload')
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

// express body parser middleware
app.use(express.json());
// app. use(bodyParser.urlencoded({ extended: false }))

// express-fileupload middleware
app.use(fileUpload({tempFileDir: '/uploads/'}));

app.post('/api/upload-file', (req, res)=> {
    const file = req.files.file;
    console.log(file);

    // Move the uploaded image to our upload folder
    file.mv(__dirname + '/upload/' + file.name);
})

app.get('/api/image/:filename', (req, res)=> {
    const filePath = path.join(__dirname, 'upload', req.params.filename);
    res.sendFile(filePath, (err)=> {
        res.status(400).send({message: 'an error occured'})
    });
})



app.listen(port, () => console.log(`server running on port ${port}`))