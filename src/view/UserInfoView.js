import { getSession, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react";

 export default function UserInfoView() {
     const {data} = useSession()
    return (
        <div>
            {data &&
                <div>
                    <div className="flex gap-2 items-center sm:flex-row md:flex-wrap">
                        <Image
                            src={data.user.image}
                            alt='user'
                            width={50}
                            height={50}
                            className="rounded-full " />
                        <h1 className="break-words font-bold uppercase">{data.user.name}</h1>
                        <div className='bg-blue-200 p-2 rounded-lg
        cursor-pointer flex flex-wrap sm:flex-nowrap hover:scale-105 active:scale-95' onClick={() => signOut()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-blue-500
            hover:animate-pulse transition-all ">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <h1 className="text-slate-500 text-sm">Logout</h1>
                        </div>
                    </div>
                    <h1 className="text-[14px] ml-0 lg:ml-[58px] lg:mt-[-10px] mt-0 text-slate-400">{data.user.email}</h1>

                </div>
            }
        </div>

    )
}


