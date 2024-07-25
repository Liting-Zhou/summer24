import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
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

export async function addWarningToGoal(id, collectionName) {
  try {
    await updateDoc(doc(db, collectionName, id), { warning: true });
  } catch (e) {
    console.log("update doc", e);
  }
}
