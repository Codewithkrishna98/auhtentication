"use server"

import dbConnection from "@/database";
import User from "@/models/user.models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function userSignupFormAction (formdata){
   await dbConnection()
try {
  const {email,password ,userName} =  formdata
  const userEmail = await User.findOne({email})
  if(userEmail){
    return {
      success : false,
      message : "user already exist plz try other email"
    }
  }

  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password,salt)
  const newlyUserRegister  = new User({
    email,
    password : hashedPassword,
    userName
  })
  const newUserSaved  = await newlyUserRegister.save()
  if(newUserSaved){
    return {
      success : true ,
      data:JSON.parse(JSON.stringify(newUserSaved))
    }
  }else {
    return {
      success : false ,
      message : "user register failed"
    }
  }
  
} catch (error) {
console.log(error);
return {
  success : false ,
  message : "something went wrong "
}
}
}

export async function userLoginFormAction(formdata){
  await dbConnection()
 try {
const {email,password} = formdata;
const checkedUser =  await User.findOne({email})
if(!checkedUser){
  return {
    success : false ,
    message : "user not found , Signup please"
  }
}

// checked passwors is correct or not 
const checkedPassword =  await bcryptjs.compare(password , checkedUser.password)
  if(!checkedPassword){
    return {
      success : false ,
      message : "password is not correct "
    }
  }

// toket creating 
const createdToken = {
  id : checkedUser._id,
  email : checkedUser.email,
  userName : checkedUser.userName
}
const token = jwt.sign(createdToken, "DEFAULT__KEY", {expiresIn : "1d"})

// cokkies 

const  getcookies = cookies()
getcookies.set("token", token)

return {
  success : true ,
  message : "login successgully"
}
 } catch (error) {
  console.log(error);
  return{
    success : false ,
    message : "something went wrong"
  }
 }


}

export async function userFetchFormAction (){
await dbConnection()
try {
  const getCookies = cookies()
  const token = getCookies.get("token")?.value || "";
  if(token === " "){
    return {
      success : false ,
      message : "token is invalid"
    }
  }
  // token verification
  const decodedToken = jwt.verify(token , "DEFAULT__KEY")
  const getUserInfo =  await User.findOne({_id:decodedToken.id})
  if(getUserInfo){
    return {
      success : true ,
      data : JSON.parse(JSON.stringify(getUserInfo))
    }
  }else {
    return {
      success : false ,
      message : "user not found "
    }
  }
} catch (error) {
  console.log(error);
  return {
    success : false ,
    message : "something went wrong hai"
  }
}
}



export async function userLogoutAction (){
  const getCookies = cookies()
  getCookies.set("token", " ")
}