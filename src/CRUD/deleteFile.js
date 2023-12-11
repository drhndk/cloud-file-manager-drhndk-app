import { useMutation } from "@tanstack/react-query";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";

async function handleDelete(refetchFile,db,data,file,router,page,msgForDelete,parentFolderId,setShowToastMsg) {
    try {
      if (page.includes(router.pathname)) {
        if (msgForDelete === 'semua file sampah') {
          const q = query(collection(db, 'Trash'),
            where("createBy", "==", data.user.email),
          );
          const querySnapshot = await getDocs(q)
          const deletePromises = querySnapshot.docs.map(async (doc) => {
            await deleteDoc(doc.ref);
          });
          // Menunggu semua promise deleteDoc selesai
          await Promise.all(deletePromises);
          refetchFile()
      setShowToastMsg('File Deleted')
        } else {
          await deleteDoc(doc(db, "Trash", file.id))
          refetchFile()
      setShowToastMsg('File Deleted')
        }
      } else {
        await deleteDoc(doc(db, "File", file.id))
        await setDoc(doc(db, "Trash", file.id), {
          namaFile: file.namaFile,
          type: file.namaFile.split(".")[1],
          id: file.id,
          modifiedAt: file.modifiedAt,
          size: file.size,
          createBy: data.user.email,
          parentFolderId: parentFolderId,
          imageUrl: file.imageUrl
        });
        refetchFile()
      setShowToastMsg('File Deleted')
      }
    } catch (error) {
      console.log(error);
      setShowToastMsg('Failed to delete file')
    }
  }

 export const mutateDeleteFile= (refetchFile,db,data,router,page,msgForDelete,file,parentFolderId,setShowToastMsg) => useMutation({
    mutationKey: 'deleteFile',
    mutationFn: async () => handleDelete(refetchFile,db,data,file,router,page,msgForDelete,parentFolderId,setShowToastMsg)
  })