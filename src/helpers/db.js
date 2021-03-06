import { firestore } from '../firebase';

export const addVideoToDb = (videoData) => {
    firestore.collection("playlist").add(videoData)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export const getPlaylistFromDb = firestore.collection("playlist")
    .get()
    .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        return data;
    });

