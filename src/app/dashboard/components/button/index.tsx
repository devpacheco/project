"use client"

import { useRouter } from "next/navigation"

//IMPORTS DE ICONS
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefrash(){
    const router = useRouter();

    return(
         <button 
         className="bg-gray-900 px-4 py-1 rounded"
         onClick={()=> router.refresh()} 
         >
            <FiRefreshCcw size={24} color="#FFF" />
         </button>
    )
}