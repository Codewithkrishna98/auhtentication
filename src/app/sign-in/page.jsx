"use client"
import { userLoginFormAction} from "@/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InitialSignInForm, loginUserControlls } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

  
  const signInPage = () => {
    const [signInFormData, setSignInFormData]= useState(InitialSignInForm)
    // console.log(signupFormData);
    const router = useRouter()

    async function handleSignIn(){
      const result  = await  userLoginFormAction(signInFormData)
      console.log(result);
      if(result?.success) router.push("/")
    }
    return (
      <div className=" flex justify-center flex-col items-center ">
        <h1 className=" m-4 text-2xl font-bold">Lets Login with your credentials</h1>
       <form action={handleSignIn}  >
       {
        loginUserControlls.map((userItem)=><div  key={userItem.name}>
          <Label>{userItem.lable}</Label>
          <Input
          type={userItem.type}
          placeholder={userItem.placeholder}
          name={userItem.name}
          value={signInFormData[userItem.name]}
          onChange={(e)=>setSignInFormData({
            ...signInFormData,
            [userItem.name] : e.target.value
          })}
          />
        </div>)
       }
       <Button  type="submit" className="bg-slate-800 hover:bg-slate-700 mt-3  text-white">Sign In</Button>
       </form>
      </div>
    )
  }
  
  export default signInPage
  