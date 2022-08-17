import { useState, useEffect } from "react";
import PhotosList from "../components/photos/PhotosList";

const AllPhotos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPhotos, setLoadedPhotos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://janisz-photo-album-default-rtdb.firebaseio.com/photos.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const photos = [];
        for (const key in data) {
            const photo = {
            id: key,
            ...data[key]
          };
          
          photos.push(photo);
        }
        setIsLoading(false);
        setLoadedPhotos(photos);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>PHOTO GALLERY</h1>
      <PhotosList photos={loadedPhotos} />
    </section>
  );
};

export default AllPhotos;
