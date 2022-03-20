//jshint esversion:6

const express = require("express");
const router = express.Router();
const user = require("../Models/User");
const department = require("../Models/Department");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchId = require("../Middleware/fetchId");
// Create a user using POST
//Including Validation
const JWT = require("jsonwebtoken");
/////////////////////
router.post(
  "/department",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "ENter a valid name").isLength({ min: 3 }),
    body("head", "ENter a valid Head Name").isLength({ min: 3 }),
    body("password", "Password Must be atleast of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //     else{
    //         const newuser=user(req.body);
    //       newuser.save()
    //     }

    //Promise Implementation of sending data in mongo Db
    let departmentcheck = await department.findOne({ email: req.body.email });
    // console.log(newuser);
    if (departmentcheck) {
      return res.json({ error: "Already existing User" });
    } else {
      // console.log(newuser.email);
      //Password Protection
      ////////
      const salt = await bcrypt.genSalt(10);// return random values
      let securedPassword = await bcrypt.hash(req.body.password, salt);
      ///////
      departmentcheck = await department.create({
        name: req.body.name,
        email: req.body.email,
        head: req.body.head,
        password: securedPassword,
      });
      // console.log(newusercheck.id);
      const fc = JWT.sign(departmentcheck.id, "mynameisnavneetraj");
      // console.log(fc);
      // res.json({ nice: "nice", dataStored: newusercheck });
      res.json({ AUTH_TOKEN: fc });
    }
    //   res.send(newuser)
  }
);
/////////////////////////////
router.post(
  "/",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "ENter a valid name").isLength({ min: 3 }),
    body("password", "Password Must be atleast of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //     else{
    //         const newuser=user(req.body);
    //       newuser.save()
    //     }

    //Promise Implementation of sending data in mongo Db
    let newusercheck = await user.findOne({ email: req.body.email });
    // console.log(newuser);
    if (newusercheck) {
      return res.json({ error: "Already existing User" });
    } else {
      // console.log(newuser.email);
      //Password Protection
      ////////
      const salt = await bcrypt.genSalt(10);// return random values
      let securedPassword = await bcrypt.hash(req.body.password, salt);
      ///////
      newusercheck = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      // console.log(newusercheck.id);
      const fc = JWT.sign(newusercheck.id, "mynameisnavneetraj");
      // console.log(fc);
      // res.json({ nice: "nice", dataStored: newusercheck });
      res.json({ AUTH_TOKEN: fc });
    }
    //   res.send(newuser)
  }
);
// End point For checking User already Registered OR not

router.post("/checkuser",
  [
    body("email", "CheckEmail").isEmail(),
    // body("password", "Password Must be atleast of 5 characters").isLength({
    //   min: 1,
    // }),
  ],
  async (req, res) => {
    let error = validationResult(req);
    // console.log(error);
    if (!error.isEmpty()) {
      res.json("Enter the correct Information");
    }
    // const[emailtocheck,passwordtocheck]=req.body;
    let emailtocheck = req.body.email;
    let passwordtocheck = req.body.password;
    let check = await user.findOne({ email: emailtocheck });
    if (!check) {
      return res.json({ Error: "Please login with valid credentials" });
    } else {
      if (await bcrypt.compare(passwordtocheck, check.password)) {
        let latestcode = JWT.sign(check.id, "mynameisnavneetraj");
        return res.json({
          Message: "Your Succesfully Login",
          AUTH_TOKEN: latestcode,
          NAME: check.name,
        });
      } else {
        return res.json({
          message: "Bap se bakchodi",
          advice: "Account banaale hack mat kar ",
        });
      }
    }
  }
);
//process will be extracting id from Auth token to get User detail trying to fetch his own details
router.get("/getuserdetails", async (req, res) => {
  try {
    // console.log(req.user);
    let fetchinguserid = req;
    const token = req.header("auth_token");
    // console.log("token "+token);
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    //extracting id of user from token
    let data = JWT.verify(token, "mynameisnavneetraj");
    // console.log("data "+data);
    // eyJhbGciOiJIUzI1NiJ9.NjFlODQ1YmIyYzg3NTU4MzVhYmVkZmRm.AZTvK6kzTwq7D_k06dNwWuQK28nI9xmC9EWbfo_Sx3M
    const fetcheduser = await user.findById(data);
    // console.log("nv--"+fetcheduser.id);
    // console.log(`nishant ${fetcheduser}`);
    res.send(fetcheduser);
  } catch (error) {
    res.status(500).send(`Internal Server Error due to ${error}`);
  }
});

//Delete a user from database
router.delete("/deleteuser", async (req, res) => {
  let auth_token = req.header("auth_token");
  if (!auth_token) {
    return res.status(401).send("Wrong User");
  }

  let data = JWT.verify(auth_token, "mynameisnavneetraj");
  let olduser = await user.findByIdAndDelete(data);
  if (!olduser) {
    return res.send("User not exists");
  }
  res.status(400).json({ result: "Userdeleted", userDeleted: olduser });
});

router.post("/checkdepartment",
  [
    body("email", "CheckEmail").isEmail(),
    // body("password", "Password Must be atleast of 5 characters").isLength({
    //   min: 1,
    // }),
  ],
  async (req, res) => {
    let error = validationResult(req);
    // console.log(error);
    if (!error.isEmpty()) {
      res.json("Enter the correct Information");
    }
    // const[emailtocheck,passwordtocheck]=req.body;
    let emailtocheck = req.body.email;
    let passwordtocheck = req.body.password;
    let check = await department.findOne({ email: emailtocheck });
    if (!check) {
      return res.json({ Error: "Please login with valid credentials" });
    } else {
      if (await bcrypt.compare(passwordtocheck, check.password)) {
        let latestcode = JWT.sign(check.id, "mynameisnavneetraj");
        return res.json({
          Message: "Your Succesfully Login",
          AUTH_TOKEN: latestcode,
          NAME: check.name,
        });
      } else {
        return res.json({
          message: "Bap se bakchodi",
          advice: "Account banaale hack mat kar ",
        });
      }
    }
  }
);
//process will be extracting id from Auth token to get User detail trying to fetch his own details
router.get("/getdepartmentdetails", async (req, res) => {
  try {
    // console.log(req.user);
    let fetchinguserid = req;
    const token = req.header("auth_token");
    // console.log("token "+token);
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    //extracting id of user from token
    let data = JWT.verify(token, "mynameisnavneetraj");
    // console.log("data "+data);
    // eyJhbGciOiJIUzI1NiJ9.NjFlODQ1YmIyYzg3NTU4MzVhYmVkZmRm.AZTvK6kzTwq7D_k06dNwWuQK28nI9xmC9EWbfo_Sx3M
    const fetcheddepartment = await department.findById(data);
    // console.log("nv--"+fetcheduser.id);
    // console.log(`nishant ${fetcheduser}`);
    res.send(fetcheddepartment);
  } catch (error) {
    res.status(500).send(`Internal Server Error due to ${error}`);
  }
});

//Delete a user from database
router.delete("/deletedepartment", async (req, res) => {
  let auth_token = req.header("auth_token");
  if (!auth_token) {
    return res.status(401).send("Wrong User");
  }

  let data = JWT.verify(auth_token, "mynameisnavneetraj");
  let olddepartment = await department.findByIdAndDelete(data);
  if (!olddepartment) {
    return res.send("Department not exists");
  }
  res.status(400).json({ result: "Departmentdeleted", departmentDeleted: olddepartment });
});
module.exports = router;

