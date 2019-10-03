import firebase from 'firebase/app'
import  'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyD6Gtzs-e5ng6gabY525ens2zjqHWzADcg",
    authDomain: "e-commerce56.firebaseapp.com",
    databaseURL: "https://e-commerce56.firebaseio.com",
    projectId: "e-commerce56",
    storageBucket: "",
    messagingSenderId: "451371214971",
    appId: "1:451371214971:web:c3fb70f49ab2ae5fe9dade",
    measurementId: "G-C9PG7SKHPF"
}

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot =await userRef.get()

    if(!snapShot.exists){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
   
    return userRef

}


firebase.initializeApp(config)


export const auth = firebase.auth()
export const firestore  = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

