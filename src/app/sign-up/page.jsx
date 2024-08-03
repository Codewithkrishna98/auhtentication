"use client"

import { userSignupFormAction } from "@/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formUserControlls, InitialValueForm } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

  
  const signUpPage = () => {
    const [signUpformData , setFormsignUpData] = useState(InitialValueForm)
    // console.log(signUpformData);
    const router = useRouter()
    function signUpformvalid (){
     return Object.keys(signUpformData).every((key)=>signUpformData[key].trim() !== "")

    }

    async function handleOnSignup(){
   const result = await userSignupFormAction(signUpformData)
     console.log(result);
     if(result?.data) router.push("/sign-in")
     
    }
    return (
      <div className=" flex justify-center flex-col items-center    ">
        <h1>Sign Up Now </h1>
        <form   action={handleOnSignup}>
         {
          formUserControlls.map((controllsItem)=>
             
          <div  className=" flex flex-col  " key={controllsItem.name}>
              <Label className="mt-3">{controllsItem.lable}</Label>
              <Input
              type={controllsItem.type}
              name={controllsItem.name}
              placeholder={controllsItem.placeholder}
              value={signUpformData[controllsItem.name]}
              onChange={(e)=>setFormsignUpData({
                ...signUpformData ,
                [controllsItem.name]: e.target.value
              })}
              />
            </div>
            )
         }
          <Button disabled={!signUpformvalid()} className="bg-slate-800 text-white mt-3 hover:bg-slate-700  disabled:opacity-25" type="submit">Sign Up</Button>
         </form>
      </div>
    )
  }
  
  export default signUpPage
  