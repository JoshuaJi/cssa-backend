var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(req.files.fileuploadResume);
  console.log(req.files.fileuploadPhoto);

  // Use Smtp Protocol to send Email
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.USERNAME,
           pass: process.env.PASSWORD
       }
   });

  var mail = {
      from: "Xu Ji <jixu204@gmail.com>",
      to: "joshuaji@icloud.com",
      subject: "CSSA Recruitment web application",
      text: "application from "+req.body.name,
      html: "<b>application from "+req.body.name+
            "<b>Name: </b>"+req.body.name+"</br>"+
            "<b>Faculty: </b>"+req.body.faculty+"</br>"+
            "<b>Year: </b>"+req.body.year+"</br>"+
            "<b>Background: </b>"+req.body.background+"</br>"+
            "<b>Language(s): </b>"+req.body.language+"</br>"+
            "<b>Email: </b>"+req.body.email+"</br>"+
            "<b>Phone: </b>"+req.body.phone+"</br>"+
            "<b>1. What is the position that you intend to apply for? Please also indicate your second and third choice.: </b>"+req.body.q1+"</br>"+
            "<b>2. Why are you interested in applying for this position? How do you perceive the roles and objectives of CSSA within the McGill community?: </b>"+req.body.q2+"</br>"+
            "<b>3. What experience/qualifications do you possess that make you a good candidate for this position?: </b>"+req.body.q3+"</br>"+
            "<b>4. How do you envision fulfilling your role? What kind of ideas (ex. events, activities, initiatives, etc.) do you have in mind?: </b>"+req.body.q4+"</br>"+
            "<b>5. Do you have other talents/skills that you think will serve as an asset? (Such as photography, graphic and web design, sports and musical instruments…): </b>"+req.body.q5+"</br>"+
            "<b>6. Have you had any experience or been involved in another club or association within or outside of the McGill community?: </b>"+req.body.q6+"</br>",
      attachments: [
        {
          filename: req.files.fileuploadResume.name,
          content: req.files.fileuploadResume.data
        },
        {
          filename: req.files.fileuploadPhoto.name,
          content: req.files.fileuploadPhoto.data
        }
      ]
  }

  transporter.sendMail(mail, function(error, response){
      if(error){
          console.log(error);
          res.send("Something went wrong, please try again or contact internal.mcgillcssa@gmail.com");
      }else{
          console.log("Message sent: " + response.message);
          res.send('Your application has sent to us successfully');
      }

      transporter.close();
  });
});

module.exports = router;
