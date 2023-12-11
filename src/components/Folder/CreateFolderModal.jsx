import app from "@/lib/firebase/init";
import Image from "next/image"
import { useContext, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ShowToastContex } from "../Context/ShowToastContex";
import { ParentFolderIdContext } from "../Context/ParentFolderIdContext";
import { RefetchFolderContext } from "../Context/refetchFolder";
import Spinner from "../Spinner/Spinner";
import { addFolder } from "@/CRUD/addFolder";


function CreateFolderModal({ refetchFolder,closeModal }) {
  const [disableBtn, setDisableBtn] = useState(true)
  const [folderName, setFolderName] = useState()
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)
  const { data } = useSession()
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)
  const id = Date.now().toString()
  const db = getFirestore(app)

  
  const { mutateAsync, status, isPending } = addFolder(db,folderName,id,data,parentFolderId,refetchFolder,setShowToastMsg)

  const createNewFolder = async () => {
    try {
      await mutateAsync()
    } catch (error) {
      console.log(error);
      setShowToastMsg('Folder failed to create')
    }
    closeModal(true)
  }

  const handleChangeValue = (e) => {
    setFolderName(e.target.value)
    e.target.value == '' ? setDisableBtn(true) : setDisableBtn(false)
  }
  return (
    <div>
      {isPending ? <Spinner /> :
        <div className="modal-box w-[240px] md:w-[300px]">
          <div className="flex justify-center">
            <Image
              src={'/folder.png'}
              height={70}
              width={70}
              alt="folder.png"
            />
          </div>
          <input type="text" className="border-[1px] border-slate-400 w-full p-[4px] rounded-md" placeholder="Nama folder" onChange={handleChangeValue} />
          <form method="dialog">
            <div className="action flex justify-end">
              <button className="btn mt-[15px]  bg-slate-400 hover:bg-slate-500">close</button>
            </div>
          </form>
            <button className="p-2 rounded-md bg-lime-500 w-full mt-[15px] active:scale-[0.97] hover:scale-105 cursor-pointer" disabled={disableBtn} onClick={createNewFolder} >Buat Folder</button>
        </div>
      }

    </div>

  )
}


export default CreateFolderModal