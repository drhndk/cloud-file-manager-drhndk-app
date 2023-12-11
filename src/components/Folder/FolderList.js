import { useRouter } from "next/router"
import FolderItem from "./FolderItem"
import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import app from "@/lib/firebase/init"
import { useContext, useState } from "react"
import { ShowToastContex } from "../Context/ShowToastContex"
import Spinner from "../Spinner/Spinner"
import { getDataList } from "@/CRUD/getData"

function FolderList({ folderList, children, daftarFolderText, isLoading }) {
    const [folderName, setFolderName] = useState()
    const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)
    const router = useRouter()
    const showFolderDetails = (folder) => {
        router.push({
            pathname: `/folder/${folder.id}`,
            query: {
                name: folder.namaFolder,
                id: folder.id
            }
        })
    }
    //  const w = folderList.length > 0 ? 'mt-[-70px]':'mt-[-200px]'
    return (
        <div className={`p-[10px] md:p-[20px] md:mt-0 `}>
            <div className=" bg-accent rounded-md p-[20px] min-h-[250px]">
                <div className="flex justify-between border-b-[1px]">
                    <h1 className="font-bold">{daftarFolderText}</h1>
                    <h1 className="text-sky-600 text-sm cursor-pointer">Lihat semua...</h1>
                </div>
                {/* {folderList.length == 0 ? <h1 className="mt-2 text-sm italic text-red-500">Folder belum ada,silahkan add folder!</h1> : */}
                {children}
                <div>
                    {isLoading ? <Spinner /> :
                        <div>
                            {folderList?.length == 0 ? <h1 className="italic text-red-500 mt-3 text-xs md:text-sm">Folder Belum ada,silahkan tambahkan folder!</h1> :
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-[15px]">
                                    {/* break word: overflow-wrap anywhare = break-all */}
                                    {folderList?.map((folder, idx) => (
                                        <div key={idx}>
                                            <div className="border-[1px] hover:border-blue-500 h-[100px] md:h-[115px] text-center flex flex-col justify-center items-center rounded-md cursor-pointer hover:scale-105 active:scale-[0.98] transition-all break-all" onClick={() => showFolderDetails(folder)}
                                            >
                                                <FolderItem />
                                                <h1 className="line-clamp-2 text-sm cursor-pointer ">{folder.namaFolder}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    }
                </div>
                {/* } */}
            </div>
        </div>

    )
}

export default FolderList


