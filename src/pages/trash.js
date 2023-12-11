import { useGetDataList } from "@/CRUD/getData"
import { ParentFolderIdContext } from "@/components/Context/ParentFolderIdContext"
import Trash from "@/components/Trash/Trash"
import app from "@/lib/firebase/init"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"


function TrashPage() {
    const [trashFile,setTrashFile] = useState([])
    const {data} = useSession()
    const db = getFirestore(app)
   
    const { data: trashFiles, refetch: trashRefetch, isLoading: trashLoading } = useGetDataList('Trash',db,'trashList')

    return (
        <Trash trashFile={trashFiles} setTrashFile={setTrashFile} refetchTrash={trashRefetch} isLoading={trashLoading}/>
    )   
}

export default TrashPage