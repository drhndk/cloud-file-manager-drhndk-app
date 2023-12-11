import { useContext, useState } from "react";
import { ShowToastContex } from "../Context/ShowToastContex";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import app from "@/lib/firebase/init";
import { TrashContext } from "../Context/TrashContext";
import { useSession } from "next-auth/react";
import { ParentFolderIdContext } from "../Context/ParentFolderIdContext";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import { mutateDeleteFile } from "@/CRUD/deleteFile";

function DeleteFileModal({ file, refetchFile, closeModal, msgForDelete }) {
  const { data } = useSession()
  const router = useRouter()
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)
  const { trashFile, setTrashFile } = useContext(TrashContext)
  const id = Date.now()
  const db = getFirestore(app)
  const page = ['/trash']

  const { mutateAsync, status, isPending } = mutateDeleteFile(refetchFile,db,data,router,page,msgForDelete,file,parentFolderId,setShowToastMsg)

  const deleteFile = async () => {
    try {
      await mutateAsync()
    } catch (error) {
      console.log(error);
      setShowToastMsg('Failed to delete file')
    }
    closeModal(true)
  }
  return (
    <div>
      {isPending ? <Spinner /> :
        <div className="modal-box w-[240px] md:w-[300px]">
          <h1 className="text-center text-xs">{`Apakah kamu ingin menghapus ${msgForDelete} ini?`}</h1>
          <div>
            <form method="dialog">
              <button className="btn mt-[15px] bg-slate-400 hover:bg-slate-500 w-full">Cancel</button>
            </form>
            <button className="p-2 rounded-md bg-red-500 w-full mt-[15px] active:scale-[0.97] hover:scale-105 cursor-pointer" onClick={() => deleteFile()}>Delete</button>
          </div>
        </div>
      }
    </div>
  )
}
export default DeleteFileModal