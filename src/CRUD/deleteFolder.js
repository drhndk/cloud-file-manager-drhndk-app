import { useMutation } from "@tanstack/react-query";
import { collection, deleteDoc, doc, getDocs, query, where, addDoc, getDoc, setDoc } from "firebase/firestore";

const toFolderAndFileDelete = async (folderId, collectionName, db, currentPath = '') => {
    const subFileAndFolderQuery = query(collection(db, collectionName), where('parentFolderId', '==', folderId))
    const subFileAndFolderSnapshot = await getDocs(subFileAndFolderQuery);

    subFileAndFolderSnapshot.forEach(async (subFileAndFolderDoc) => {
        const subFileAndFolderData = subFileAndFolderDoc.data();

        // Hapus file terkait di koleksi "File"
        if (collectionName === 'Folders') {
            await deleteRelatedFiles(subFileAndFolderData.id, 'File', db);
        }

        // Rekursif untuk subfolder
        const subFolderPath = currentPath ? `${currentPath}/${subFileAndFolderData.namaFolder}` : subFileAndFolderData.namaFolder;
        await toFolderAndFileDelete(subFileAndFolderData.id, collectionName, db, subFolderPath);

        // Move file to trash
        await moveFileToTrash(subFileAndFolderData.id, collectionName, db, subFolderPath);
        await deleteDoc(subFileAndFolderDoc.ref);
    });
}

const deleteRelatedFiles = async (folderId, fileCollectionName, db) => {
    const relatedFilesQuery = query(collection(db, fileCollectionName), where('parentFolderId', '==', folderId));
    const relatedFilesSnapshot = await getDocs(relatedFilesQuery);

    relatedFilesSnapshot.forEach(async (relatedFileDoc) => {
        const relatedFileData = relatedFileDoc.data();
        await moveFileToTrash(relatedFileData.id, fileCollectionName, db);
        await deleteDoc(relatedFileDoc.ref);
    });
}

const moveFileToTrash = async (fileId, collectionName, db, currentPath = '') => {
    const fileDocRef = doc(db, collectionName, fileId.toString());
    try {
        const fileSnapshot = await getDoc(fileDocRef);

        if (fileSnapshot.exists()) {
            const fileData = fileSnapshot.data();

            // Pengecekan tipe data: Pastikan hanya file yang dipindahkan ke "Trash"
            if (collectionName === 'File') {
                const trashCollectionRef = collection(db, "Trash");

                // Menentukan ID dokumen secara kustom
                const trashDocRef = doc(trashCollectionRef, fileData.id.toString());

                // Menambahkan dokumen ke koleksi "Trash" dengan ID yang diinginkan
                await setDoc(trashDocRef, { ...fileData, path: currentPath });

                // Menghapus dokumen asli dari koleksi awal
                await deleteDoc(fileDocRef);
            } else {
                console.log("Tidak memindahkan folder ke Trash:", fileId);
            }
        } else {
            console.log("Dokumen tidak ditemukan:", fileId);
        }
    } catch (error) {
        console.error("Gagal mengambil data dokumen:", error);
    }
};

const deleteFolderAndSubfolders = async (db, folderId) => {
    await toFolderAndFileDelete(folderId, 'Folders', db);
    await toFolderAndFileDelete(folderId, 'File', db);
    await deleteDoc(doc(db, "Folders", folderId.toString()));
};

async function deleted(setShowToastMsg, folderNameToDelete, setFolderNameToDelete, setHandleNameError, refetchFolder, folderList, setFolderList, db) {
    try {
        const folderToDelete = folderList.find(folder => folder.namaFolder === folderNameToDelete);
        if (folderToDelete) {
            await deleteFolderAndSubfolders(db, folderToDelete.id).then(res => {
                const updatedFolderList = folderList.filter(folder => folder.id !== folderToDelete.id);
                setFolderList(updatedFolderList);
            });
            setFolderNameToDelete('');
            setHandleNameError('');
            refetchFolder();
            setShowToastMsg('Folder Deleted');
        } else {
            setHandleNameError('Masukkan nama folder yang sesuai (perhatikan huruf besar dan huruf kecil!)');
        }
    } catch (error) {
        console.log(error);
    }
}

export const mutateDeleteFolder = (setShowToastMsg, folderNameToDelete, setFolderNameToDelete, setHandleNameError, refetchFolder, folderList, setFolderList, db) => useMutation({
    mutationKey: ['deleteFolderAndFile'],
    mutationFn: () => deleted(setShowToastMsg, folderNameToDelete, setFolderNameToDelete, setHandleNameError, refetchFolder, folderList, setFolderList, db)
});
