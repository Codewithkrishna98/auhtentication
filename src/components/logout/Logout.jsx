"use client";

// import Link from 'next/link';
import { Button } from '../ui/button'
import { userLogoutAction } from '@/action'

const Logout = () => {
 

  async function handleLogOut(){
    await userLogoutAction()
  }

  return (
    
      <div>
        <Button onClick={handleLogOut} className="bg-slate-800 hover:bg-slate-600 text-white">Logout</Button>
      </div>

    
  );
};

export default Logout;
