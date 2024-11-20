import { db } from "./DB";
import { collection, doc, where, getDocs, query, getDoc } from 'firebase/firestore';


export const getUserById = async ( userId ) => {

  try {
    const docRef = doc( db, 'users', userId );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {  return docSnapshot.data()  } 
    else {  return null  }

  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

//*******************************  * PROJECT *  *********************************** */

export const getProjects = async (uid)=>{ 
    const data = [];
    const request = query( collection(db, "projects"), where("uid", "==", uid ) );
    const querySnapshot = await getDocs(request);
    querySnapshot.forEach((doc) => {
      data.push({...doc.data(), pid: doc.id })
    })
    return data
}


export const getProjectById = async ( pid ) => {

    try {
      const docRef = doc( db, 'projects', pid );
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {  return docSnapshot.data()  } 
      else {  return null  }

    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
};


//*******************************  * CULTURE *  *********************************** */

export const getSpeculations = async ({ pid })=>{ 

    const data = [];
    const request = query( collection(db, "speculations"), where("pid", "==", pid) );
    const querySnapshot = await getDocs(request);
    querySnapshot.forEach((doc) => {
      data.push({...doc.data(), sid: doc.id })
    })
    return data
  }


//*******************************  * ITK *  *********************************** */

export const getITKById = async ( sid ) => {

    try {
      const docRef = doc( db, 'itks', sid );
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {  return docSnapshot.data()  } 
      else {  return null  }

    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
};