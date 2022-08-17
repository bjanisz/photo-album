import React from "react";
import { useHistory } from 'react-router-dom';
import NewPhotoForm from "../components/photos/NewPhotoForm";
import "./NewPhoto.module.css";

const NewPhoto = () => {
  const history = useHistory();

  function addPhotoHandler(photoData) {
    fetch(
      "https://janisz-photo-album-default-rtdb.firebaseio.com/photos.json",
      {
        method: "POST",
        body: JSON.stringify(photoData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(()=> {
      history.replace('/');
    })
  }

  return (
    <section>
      <h1>Add new photo</h1>
      <NewPhotoForm onAddPhoto={addPhotoHandler} />
    </section>
  );
};

export default NewPhoto;
