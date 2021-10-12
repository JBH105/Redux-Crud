const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("./db/conn");
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./routes/Router");
const mongoose = require("mongoose");
const SignUp = require("./Model/SignupData");
const OtpModel = require("./Model/Otp");
const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
app.use("/", router);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "jbh.globaliasoft@gmail.com",
    pass: "34y678jndskjnkj",
  },
});

app.post("/verifyotp", async (req, res) => {
  let dataUser = await SignUp.findOne({ email: req.body.email });
  console.log(dataUser.toString());
  let otpNumber = await OtpModel.findOne({ _id: dataUser._id.toString() });
  // console.log(otpNumber, "asdfgyhujop");
  if (req.body.tokenOTP === otpNumber.otp) {
    res.status(200).send("true");
    let otpNumber = await OtpModel.findOneAndRemove({ _id: dataUser._id });
  } else {
    res.status(200).send("false");
  }
  console.log(req.body, otpNumber);
});
//Find Email
// let dataArr = [];
// app.get("/api/data/email", async (req, res) => {
//   const signupmain = await SignUp.find().then((result) => {
//     result.forEach((x) => {
//       dataArr.push({ email: x.email });
//     });
//   });
//   await res.status(200).json(dataArr);
//   console.log(dataArr);
// });
//....Signup...//
// const dataArr = [];
app.post("/signup", async (req, res) => {
  var otp = Math.floor(Math.random() * 10000 + 100);
  console.log("SignUp OTP ", otp);
  const useremail = await SignUp.findOne({ email: req.body.email });
  if (useremail) {
    res.json({ error: "User email already exists" });
  } else {
    const signup = new SignUp({
      name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const token = jwt.sign({ password: signup.password }, "abcd123", {
      expiresIn: "2h",
    });
    //   console.log(token,"token")

    signup.save().then((res1) => {
      console.log(res1);
      res.json({ res1, token });
    });
    let OTP = new OtpModel({
      _id: signup._id,
      otp: otp,
    })
      .save()
      .then(() => {
        var mailOptions = {
          to: req.body.email,
          subject: "OTP for the registration",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          res.render("otp");
        });
      });
  }
});

//.....Login User......//

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await SignUp.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "abc123", {
        expiresIn: "2h",
      });

      user.token = token;

      res.status(200).json({ token: token });
    }
    res.send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

//Forgot Password

app.put("/verify/password/:email", (req, res) => {
  SignUp.updateOne(
    { email: req.params.email },
    { $set: { password: bcrypt.hashSync(req.body.password, 10) } }
  ).then((result) => {
    res.status(200).json(result);
  });
});

app.post("/forgot/password", async (req, res) => {
  const userEmail = await SignUp.findOne({ email: req.body.email });
  // res.json(userEmail._id)
  if (userEmail) {
    res.json(userEmail);
    var ForgotOTP = Math.floor(Math.random() * 10000 + 100);
    console.log("Forgot Password", ForgotOTP);
    let OTP = new OtpModel({
      _id: userEmail._id,
      otp: ForgotOTP,
    })
      .save()
      .then(() => {
        var mailOptions = {
          to: req.body.email,
          subject: "Forgot Password",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            ForgotOTP +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          res.render("otp");
        });
      });
  }
});

port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
