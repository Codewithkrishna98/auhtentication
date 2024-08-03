import { userFetchFormAction } from "@/action";
import Logout from "@/components/logout/Logout";
import { redirect } from "next/navigation";



export default async  function Home() {

  const userDetails = await userFetchFormAction()
  
  console.log(userDetails)
 if(!userDetails?.success) redirect("/sign-in")
  return (
    <div className="flex justify-center flex-col items-center p-4">

      <h1 className=" text-2xl font-bold "> Welcome : {userDetails?.data?.userName}  </h1>
      <h2 className=" text-2xl font-bold ">  {userDetails?.data?.email}  </h2>
      
        <Logout/>
    </div>

  );
}
