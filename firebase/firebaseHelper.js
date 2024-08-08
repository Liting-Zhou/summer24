import {
  addDoc,
  setDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

export async function getADoc(id, collectionName) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.log("read a doc from db", e);
  }
}

export async function writeToDB(data, collectionName) {
  // console.log("write to db, collectionName", collectionName);
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (e) {
    console.log("write to db", e);
  }
}

export async function writeWithIdToDB(data, id, collectionName) {
  try {
    await setDoc(doc(db, collectionName, id), data, { merge: true });
  } catch (e) {
    console.log("write with id to db", e);
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
