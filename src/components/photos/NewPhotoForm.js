import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "./NewPhotoForm.module.css";

import {storage} from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

function NewPhotoForm(props) {
  const titleInputRef = useRef();
  const photoInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  /*tutaj dodaje*/
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null)

  const handleImageChange = (e) => {
      if(e.target.files[0]) {
        setImage(e.target.files[0])
      }
  };

  console.log(image)

  const handleUpload = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image URL!");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


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

    props.onAddPhoto(photoData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="photo">Photo</label>
          {/* <input type='url' required id='photo' ref={photoInputRef} /> */}
          <input
            type="file"
            required
            id="photo"
            ref={photoInputRef}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit" onClick={handleUpload}>
            Add new photo
          </button>
          {/* dodalem onClicka i paragraf */}
        </div>
      </form>
    </Card>
  );
}

export default NewPhotoForm;
