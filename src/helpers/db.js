import { firestore } from '../firebase';

export const addVideoToDb = (videoData, cb) => {
    firestore.collection("playlist").add(videoData)
        .then((docRef) => {
            cb(docRef.id)
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export const getPlaylistFromDb = firestore.collection("playlist")
    .get()
    .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
            const resultData = {id: doc.id, ...doc.data()}
            return resultData
        });
        return data;
    });

export const removeVideoFromDb = (id) => {
    firestore.collection("playlist").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
}

