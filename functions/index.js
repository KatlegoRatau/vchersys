const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'katlego.kg27@gmail.com',
        pass: 'SHerbbet@1011'
    }
});



exports.sendContactMessage = functions.database.ref('/colleagues/{pushKey}').onWrite(event => {
  const snapshot = event.data;
// Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }
  
  const val = snapshot.val();
  console.log(val);
  const mailOptions = {
	from: 'katlego.kg27@gmail.com' ,
    to: val.email ,
    subject: 'Password Creation',
    html: 'Testing'
  };
  
 
  
  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});



/*Mail to client*/




 
});
