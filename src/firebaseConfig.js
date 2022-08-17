import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const app = initializeApp ({
    apiKey: "AIzaSyAB1YjNVonJwue0DKY6kvTYsymhQskRjyE",
    authDomain: "janisz-photo-album.firebaseapp.com",
    databaseURL: "https://janisz-photo-album-default-rtdb.firebaseio.com",
    projectId: "janisz-photo-album",
    storageBucket: "janisz-photo-album.appspot.com",
    messagingSenderId: "289708207318",
    appId: "1:289708207318:web:7eddf6db42c4864dd26d77"
});

const storage = getStorage(app);
export default storage;