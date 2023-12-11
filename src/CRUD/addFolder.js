import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore"; 


async function createFolder (db,folderName,id,data,parentId,refetchFolder,setShowToastMsg) {
    try {
      await setDoc(doc(db, "Folders", id), {
        namaFolder: folderName,
        id: id,
        createBy: data.user.email,
        parentFolderId: parentId
      });
      refetchFolder()
      setShowToastMsg('Folder Succes')
    } catch (error) {
      console.log(error);
      setShowToastMsg('Folder failed to create')
    }
  }

 export const addFolder = (db,folderName,id,data,parentId,refetchFolder,setShowToastMsg) => useMutation({
    mutationKey: ['createFolder'],
    mutationFn: async () => createFolder(db,folderName,id,data,parentId,refetchFolder,setShowToastMsg),
  })
