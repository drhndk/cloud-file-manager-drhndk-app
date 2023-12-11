import app from "@/lib/firebase/init";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ShowToastContex } from "../Context/ShowToastContex";
import { useContext, useEffect } from "react";
import { ParentFolderIdContext } from "../Context/ParentFolderIdContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Spinner from "../Spinner/Spinner";
import { useMutateUploadFile } from "@/CRUD/addFile";

function UploadFileModal({ closeModal,refetchFile }) {
  const db = getFirestore(app)
  const id = Date.now().toString()
  const { data } = useSession()
  const storageFile = getStorage(app);
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContex)
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)

  const {mutateAsync,status,isPending,isError} =  useMutateUploadFile(data,id,parentFolderId,db,refetchFile,storageFile,setShowToastMsg)
  const uploadFile = async (file) => {
    try {
      await mutateAsync(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setShowToastMsg('Failed to upload file');
    }
    closeModal(true);
  };
  
  return (
    <div>
       {isPending ? <Spinner/> : 
      <form method="dialog" className="modal-box p-9 items-center w-[305px] md:w-[350px]">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          x
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-50 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => uploadFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </form>
       }
    </div>
  )
}

export default UploadFileModal