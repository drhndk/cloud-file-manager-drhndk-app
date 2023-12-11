import FileList from '@/components/File/FileList'
import FolderList from '@/components/Folder/FolderList'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { getFirestore } from "firebase/firestore";
import app from '@/lib/firebase/init'
import { ParentFolderIdContext } from '@/components/Context/ParentFolderIdContext'
import FolderDelete from '@/components/Folder/FolderDelete'
import CreateFolderModal from '@/components/Folder/CreateFolderModal'
import UploadFileModal from '@/components/File/UploadFileModal'
import { useGetDataList } from '@/CRUD/getData'

export default function Home({product,refetch}) {
  const db = getFirestore(app)
  const { data } = useSession()
  const [folderList, setFolderList] = useState([])
  const router =useRouter()
  const [fileList, setFileList] = useState([])
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext)
  
// const r =  async() => {
//   const w = await getSession()
//   console.log(w.user);
// }  

// r()
  const { data: foldersList, isLoading, refetch: folderRefetch} = useGetDataList('Folders',db,'folderList',[{ field: 'parentFolderId', operator: '==', value: 0 }],setParentFolderId,0)
  
  const { data: filesList, isLoading: fileListLoading, refetch: fileRefetch} = useGetDataList('File',db,'fileList',[{ field: 'parentFolderId', operator: '==', value: 0 }],setParentFolderId,0)
  
  return (
    <div>
      <FolderList folderList={foldersList} daftarFolderText={'Daftar Folder'} isLoading={isLoading} >
        <FolderDelete folderList={foldersList} setFolderList={setFolderList} isLoading={isLoading} refetchFolder={folderRefetch}/>
        <dialog id="my_modal_4" className="modal">
          <CreateFolderModal refetchFolder={folderRefetch} closeModal={() => window.my_modal_4.close()} />
        </dialog>
      </FolderList>
      <FileList fileList={filesList} setFileList={setFileList} refetchFile={fileRefetch} >
        <dialog id="upload_file" className="modal">
          <UploadFileModal refetchFile={fileRefetch} closeModal={() => window.upload_file.close()} />
        </dialog>
      </FileList>
    </div>
  )
}
