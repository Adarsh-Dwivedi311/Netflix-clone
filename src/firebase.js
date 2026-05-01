import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";
  import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBTh9TognD5ok73kxrmotYZ647HYl-rHhE",
  authDomain: "netflix-clone-7949d.firebaseapp.com",
  projectId: "netflix-clone-7949d",
  storageBucket: "netflix-clone-7949d.firebasestorage.app",
  messagingSenderId: "249700666697",
  appId: "1:249700666697:web:07cbc522b62eaf4a6a9e98"
};

const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const db = getFirestore(app);


const signup = async(name, email, password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }

}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export { auth, db, login, signup, logout };