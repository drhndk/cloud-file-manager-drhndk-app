import app from "@/lib/firebase/init";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ShowToastContex } from "../Context/ShowToastContex";

function StorageInfo() {
    const { data } = useSession()
    const [totalSizeUsed, setTotalSizeUsed] = useState(0)
    const [folderList, setFolderList] = useState()
    const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)

    const db = getFirestore(app)
    let totalSize = 0

    useEffect(() => {
        if (data) {
            totalSize = 0
            getAllFile()
        }
    }, [data, showToastMsg])
    const getAllFile = async () => {
        const q = query(collection(db, "File"),
            where("createBy", "==", data?.user?.email),
        );
        const updatedFolderList = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            totalSize = totalSize + doc.data()['size']
            updatedFolderList.push(doc.data())
        });
        setFolderList(updatedFolderList)
        setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + " MB")
    }
    return (
        <div className="mt-[20px]">
            <span>{totalSizeUsed}</span>
            <span> of </span>
            <span>5GB</span>
            <div className='w-[210px] sm:w-full
        bg-gray-200  h-2.5 flex'>
                <div className='bg-blue-600 h-2.5 w-[25%]'></div>
                <div className='bg-green-600 h-2.5 w-[35%]'></div>
                <div className='bg-yellow-400 h-2.5 w-[15%]'></div>
            </div>
        </div>
    )
}

export default StorageInfo