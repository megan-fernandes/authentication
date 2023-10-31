import { Request, Response } from "express";
const passport = require("passport");
require("../middleware/passport")

//Prisma Client
const prisma = require("../config/prismaClient")

//password hashing
const bcrypt = require('bcrypt');

//jwt
const jwt = require('jsonwebtoken');
// Secret key for JWT
const secretKey = 'secret-key';

//login of user
exports.login = async (req: Request,res:Response, next: any)=>{
    console.log("in here");
    const {email, entered_pass} = req.body;
    // const {entered_pass} = req.body.password;
    console.log(email,entered_pass);
    
    // try {
    //     // const email = req.params.email;
    //     // const entered_pass = req.params.password;
    //     // 
        

    //     const email = req.body.email;
    //     const entered_pass = req.body.password;
    //     console.log(email,entered_pass);
        
    //     const checkUser = await prisma.person.findUnique({
    //         where: {
    //         email: email,
    //         },
    //     });
        
        
    //     // if(checkUser && (await bcrypt.compare(entered_pass, checkUser.password))){
    //     if(checkUser && (checkUser.password == entered_pass)){
    //         const loggedInUser = await prisma.person.update({
    //             where:{
    //                 email: email
    //             },
    //             data: {
    //                 is_logged_in:true
    //             }
    //         })
    //         const token = jwt.sign(
    //             { userid: checkUser.username},
    //             secretKey,
    //             {
    //             expiresIn: "6h",
    //             }
    //         );

    //         res.status(200).json({token: token, user: loggedInUser});
    //     } else{
    //         res.status(400).json("Password did not match or user not found")
    //     }
    // } catch (error: any) {
    //     console.log(error.message);
    //     res.status(400).json(error.message);
    // }
    next;
}

//google callback function
exports.callback = async (req: Request,res: Response) =>{
  
  // Successful authentication, redirect home.
  try {
    console.log("database entry");
    const details:any = req.user
    // console.log(details._json);

    const data: any = details._json;
    const email_id: string = data.email;
    console.log(email_id);
  if (req.user && data.email_verified) {
    console.log("success");

    const checkUser = await prisma.federated.findUnique({
              where: {
              email: email_id,
              },
          });
          
          if(checkUser){
              const loggedInUser = await prisma.federated.update({
                  where:{
                      email: email_id
                  },
                  data: {
                      is_logged_in:true
                  }
              })}
              else{
                const addUser = await prisma.federated.create({
                  data: {
                    email: email_id,
                    is_logged_in: true
                  }
                })
              }         

  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
    console.log("failed");
  }
  } catch (error: any) {
    console.log(error.message);
    
  }

  res.redirect('/auth/protected');
}
    
exports.protected = async (req: Request, res: Response) => {
  try {
    console.log("hello Protected");
    const data:any = req.user
    console.log(data._json);
  if (req.user) {
    res.render('success',{title:"Successful", data: data._json})
		// res.status(200).json({
		// 	error: false,
		// 	message: "Successfully Loged In",
		// 	user: req.user,
		// });
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
  } catch (error: any) {
    console.log(error.message);
    
  }
  
  
  
}

//logout of user


