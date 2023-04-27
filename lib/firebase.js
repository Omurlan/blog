import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD5NQrC582Sy_8ckTTarfpdfFelpSUBVIg',
  authDomain: 'blog-c9ff6.firebaseapp.com',
  projectId: 'blog-c9ff6',
  storageBucket: 'blog-c9ff6.appspot.com',
  messagingSenderId: '751803560894',
  appId: '1:751803560894:web:33261d09279ecf9cfeffef',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
