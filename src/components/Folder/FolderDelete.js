import app from "@/lib/firebase/init";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useContext, useState } from "react";
import { ShowToastContex } from "../Context/ShowToastContex";
import Spinner from "../Spinner/Spinner";
import { useMutateDeleteFolder } from "@/CRUD/deleteFolder";

function FolderDelete({ folderList, setFolderList, isLoading, refetchFolder }) {
  const [folderNameToDelete, setFolderNameToDelete] = useState('');
  const [handleNameError, setHandleNameError] = useState('')
  const [handleDisabled, setHandleDisabled] = useState()
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)
  const db = getFirestore(app)


  const { mutateAsync, isPending } = useMutateDeleteFolder(setShowToastMsg, folderNameToDelete, setFolderNameToDelete, setHandleNameError, refetchFolder, folderList, setFolderList, db,'Trash')

  const handleDelete = async () => {
    try {
      await mutateAsync()
    } catch (error) {
      console.log(error);
    }
    folderNameToDelete !== '' ? setHandleDisabled(false) : setHandleDisabled(true)
  };

  const handleChangeValue = (e) => {
    setFolderNameToDelete(e.target.value)
    e.target.value == '' ? setHandleDisabled(true) : setHandleDisabled(false)
  }

  return (
    <div>
      {!isLoading &&
        <div>
          {folderList?.length > 0 &&
            <div>
              {isPending ? <Spinner /> :
                <div className="">
                  <h1 className="text-sm text-red-500 mt-[10px]">{handleNameError}</h1>
                  <input type="text" className=" mt-[5px] bg-transparent border-[1px] p-[5px] outline-none w-[110px] sm:w-[250px]" placeholder="Nama Folder" onChange={handleChangeValue} value={folderNameToDelete} />
                  <button className="border-[1px] p-[5px] ml-[-4px] bg-red-500 hover:scale-105 active:scale-95 cursor-pointer" onClick={handleDelete} disabled={handleDisabled} >Delete</button>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  )
}


export default FolderDelete