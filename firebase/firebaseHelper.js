import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  // console.log("write to db, collectionName", collectionName);
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (e) {
    console.log("write to db", e);
  }
}

export async function deleteFromDB(id, collectionName) {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (e) {
    console.log("delete from db", e);
  }
}

export async function readAllDocs(collectionName) {
  console.log("read all docs", auth.currentUser.uid);
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where("owner", "==", auth.currentUser.uid)
      )
    );
    let newArray = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        newArray.push(doc.data());
      });
    }
    return newArray;
  } catch (e) {
    console.log("read all from db", e);
  }
}

export async function addWarningToGoal(id, collectionName) {
  try {
    await updateDoc(doc(db, collectionName, id), { warning: true });
  } catch (e) {
    console.log("update doc", e);
  }
}
