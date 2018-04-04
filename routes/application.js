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

  var application_form = "Name: "+req.body.name+"\n\n"+
  "Faculty: "+req.body.faculty+"\n\n"+
  "Year: "+req.body.year+"\n\n"+
  "Background: "+req.body.background+"\n\n"+
  "Language(s): "+req.body.language+"\n\n"+
  "Email: "+req.body.email+"\n\n"+
  "Phone: "+req.body.phone+"\n\n"+
  "1. What is the position that you intend to apply for? Please also indicate your second and third choice.: \n"+req.body.q1+"\n\n"+
  "2. Why are you interested in applying for this position? How do you perceive the roles and objectives of CSSA within the McGill community?: \n"+req.body.q2+"\n\n"+
  "3. What experience/qualifications do you possess that make you a good candidate for this position?: \n"+req.body.q3+"\n\n"+
  "4. How do you envision fulfilling your role? What kind of ideas (ex. events, activities, initiatives, etc.) do you have in mind?: \n"+req.body.q4+"\n\n"+
  "5. Do you have other talents/skills that you think will serve as an asset? (Such as photography, graphic and web design, sports and musical instruments…): \n"+req.body.q5+"\n\n"+
  "6. Have you had any experience or been involved in another club or association within or outside of the McGill community?: \n"+req.body.q6+"\n\n";

  var mail = {
      from: "Xu Ji <jixu204@gmail.com>",
      to: process.env.TO_EMAIL,
      subject: "CSSA Recruitment web application",
      text: "application from "+req.body.name,
      html: "<b>application from "+req.body.name,
      attachments: [
        {
          filename: req.body.name+".txt",
          content: application_form
        },
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
