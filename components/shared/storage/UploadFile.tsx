import { getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useRef, useState } from 'react';

const UploadFile = ({ setImageCallback }: { setImageCallback: any }) => {
    const inputEl = useRef(null) as any;
    const [imgUrl, setImgUrl] = useState('');
    const [value, setValue] = useState(0);

    function setImage(imageUrl: string) {
        setImageCallback(imageUrl);
        setImgUrl(imageUrl);
    }

    function uploadFile() {
        const file = inputEl.current.files[0];
        if (!file) return;

        const firebaseApp = getApp();
        const storage = getStorage(firebaseApp, 'gs://remoteu-org.appspot.com');
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setValue(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
                    setImage(downloadURL);
                });
            }
        );
    }

    return (
        <div className="space-y-4 p-4">
            <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-width duration-500 ease-in-out"></div>
                </div>
            </div>
            <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                    type='file'
                    onChange={uploadFile}
                    ref={inputEl}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
            </label>
            {imgUrl && (
                <img src={imgUrl} alt='Uploaded file' className="max-w-xs rounded overflow-hidden shadow-lg" />
            )}
        </div>
    );
};

export default UploadFile;
