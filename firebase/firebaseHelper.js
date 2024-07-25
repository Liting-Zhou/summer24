import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseSetup";

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
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
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
