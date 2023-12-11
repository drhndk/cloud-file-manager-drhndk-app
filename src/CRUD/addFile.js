import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


 async function uploadDataFile(file,data,id,parentId,db,refetchFile,storageFile,setShowToastMsg) {
    const fileRef = ref(storageFile, 'file/' + file.name);
    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      await setDoc(doc(db, "File", id), {
        namaFile: file.name,
        id: id,
        type: file.name.split(".")[1],
        modifiedAt: Date.now(),
        size: file.size,
        createBy: data.user.email,
        parentFolderId: parentId,
        imageUrl: downloadURL
      });
      refetchFile(); 
      setShowToastMsg('File created')
    } catch (error) {
      console.error('Error uploading file:', error)
      setShowToastMsg('Failed to upload file');
    }
  }


 export const mutateUploadFile = (data,id,parentId,db,refetchFile,storageFile,setShowToastMsg) => useMutation({
    mutationKey: 'uploadFile',
    mutationFn:  async (file) => uploadDataFile(file,data,id,parentId,db,refetchFile,storageFile,setShowToastMsg)
  })