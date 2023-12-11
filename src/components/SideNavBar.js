import menuDatasBar from "@/data/menuDataBar"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import CreateFolderModal from "./Folder/CreateFolderModal"
import UploadFileModal from "./File/UploadFileModal"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

function SideNavBar() {
    const disabledSideBar = ['/login','/404']
    const disabledBtnAddFileAndFolder = ['/trash']
    const [initClass, setInitClass] = useState(0)
    const { pathname } = useRouter()
    return (
        <div>
            {!disabledSideBar.includes(pathname) &&
                <div className="w-[145px] sm:w-[220px] bg-slate-800 h-screen sticky top-0 ">
                    <div className="p-5">
                        <Image
                            src={'/logo2.png'}
                            alt='logo'
                            width={200}
                            height={100}
                            priority
                        />
                        {/* <div className="flex gap-2 justify-center mt-5 text-white">
                    <h1>Dhurhan</h1>
                    <h1>Kusnaidi</h1>
                    </div> */}
                        <div>
                        {!disabledBtnAddFileAndFolder.includes(pathname) &&
                            <div>
                            <button onClick={() => window.upload_file.showModal()} className="btn btn-accent w-full text-sm mt-[20px]">Add File</button>
                            <button onClick={() => window.my_modal_4.showModal()} className="btn btn-accent w-full text-sm mt-[10px]">Add Folder</button>
                        </div>
                        }
                            {menuDatasBar.map((menu, idx) => (
                                <div key={menu.id} className="text-white">
                                    <div onClick={() => setInitClass(idx)} className={`flex mt-[20px] gap-2 cursor-pointer hover:scale-105 ${initClass == idx ? `bg-slate-100 text-black` : null} p-2`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={menu.logo} />
                                        </svg>
                                        <Link href={menu.name === 'Trash' ? '/trash' : '/'}>{menu.name}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                  

                </div>
            }
        </div>
    )
}

export default SideNavBar