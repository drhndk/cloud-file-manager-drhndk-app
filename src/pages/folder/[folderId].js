import { getDataList } from "@/CRUD/getData"
import { ParentFolderIdContext } from "@/components/Context/ParentFolderIdContext"
import { ShowToastContex } from "@/components/Context/ShowToastContex"
import FileList from "@/components/File/FileList"
import UploadFileModal from "@/components/File/UploadFileModal"
import CreateFolderModal from "@/components/Folder/CreateFolderModal"
import FolderDelete from "@/components/Folder/FolderDelete"
import FolderList from "@/components/Folder/FolderList"
import app from "@/lib/firebase/init"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"


function FolderDetails() {
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)
  const router = useRouter()
  const { data } = useSession()
  const { name, id } = router.query
  const [folderList, setFolderList] = useState([])
  const [fileList, setFileList] = useState([])
  const db = getFirestore(app)

  const {data: folderSubList,refetch: refetchSubFolder ,isLoading: folderLoading} = getDataList('Folders',db,`folderSubList_${id}`,[{ field: 'parentFolderId', operator: '==', value: id }],setParentFolderId,id,router)
  
  const {data:fileSubList,refetch: fileRefetchSub} = getDataList('File',db,`fileSubList_${id}`,[{ field: 'parentFolderId', operator: '==', value: id }],setParentFolderId,id,router)

  return (
    <div>
      <FolderList folderList={folderSubList} daftarFolderText={name} isLoading={folderLoading}>
        <FolderDelete folderList={folderSubList} setFolderList={setFolderList} refetchFolder={refetchSubFolder} />
          <dialog id="my_modal_4" className="modal">
          <CreateFolderModal refetchFolder={refetchSubFolder} closeModal={() => window.my_modal_4.close()} />
        </dialog>
      </FolderList>
      <FileList fileList={fileSubList} setFileList={setFileList} refetchFile={fileRefetchSub} >
      <dialog id="upload_file" className="modal">
          <UploadFileModal refetchFile={fileRefetchSub} closeModal={() => window.upload_file.close()} />
        </dialog>
      </FileList>
    </div>

  )
}

export default FolderDetails