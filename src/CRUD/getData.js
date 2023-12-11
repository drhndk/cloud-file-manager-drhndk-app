import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getSession } from "next-auth/react";


async function snapDataList(collectionName, db, conditions, setParentFolderId, value) {
  const session = await getSession()
  if (session.user) {
    if (setParentFolderId !== undefined && value !== undefined) {
      setParentFolderId(value);
    }
    
    let q = query(collection(db, collectionName), where("createBy", "==", session.user.email));
    // Add additional conditions to the query
    if (conditions && conditions.length > 0) {
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    return [];
  }
}

 export const  useGetDataList =  (collectionName, db, key, conditions, setParentFolderId, value) => {  
return useQuery({
    queryKey: [key],
    queryFn: () => snapDataList(collectionName, db, conditions, setParentFolderId, value),
  });
}

  

// export async function getDatasList(setDataList, data, collectionName, parentId, db) {
//   const q = query(collection(db, collectionName),
//     where("createBy", "==", data.user.email),
//     where("parentFolderId", '==', parentId)
//   );
//   const updatedFolderList = [];
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     // console.log(doc.id, " => ", doc.data());
//     updatedFolderList.push(doc.data())
//     setDataList(updatedFolderList)
//   });

// }