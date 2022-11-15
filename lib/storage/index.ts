import { getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Get a non-default Storage bucket
const firebaseApp = getApp();
const _storage = getStorage(firebaseApp, 'gs://remoteu-org.appspot.com');
