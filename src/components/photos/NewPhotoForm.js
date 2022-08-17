import { useRef, useState } from 'react';

import Card from '../ui/Card';
import classes from './NewPhotoForm.module.css';

import storage from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function NewPhotoForm(props) {
  const titleInputRef = useRef();
  const photoInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

/*tutaj dodaje*/
const [file, setFile] = useState("");
const [percent, setPercent] = useState(0);

function handleFileUpload(event) {
  setFile(event.target.files[0]);
}

const handleUpload = () => {
  if (!file) {
    alert("Please upload an image!");
  }
}

const storageRef = ref(storage, `/files/${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
  "state changed",
  (snapshot) => {
    const percent = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes)*100
    );
    setPercent(percent)
  },
  (err) => console.log(err),
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      console.log(URL)
    });
  }
);


/*tutaj dodaje*/

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredPhoto = photoInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const photoData = {
      title: enteredTitle,
      photo: enteredPhoto,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddPhoto(photoData)
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='photo'>Photo</label>
          {/* <input type='url' required id='photo' ref={photoInputRef} /> */}
          <input type="file" required id='photo' ref={photoInputRef} accept="image/*" onChange={handleFileUpload}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type='submit' onClick={handleUpload}>Add new photo</button>
          {/* dodalem onClicka i paragraf */}
          <p> {percent} % done</p>

        </div>
      </form>
    </Card>
  );
}

export default NewPhotoForm;