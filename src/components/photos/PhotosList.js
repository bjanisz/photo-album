import PhotoItem from "./PhotoItem";
import classes from "./PhotosList.module.css";

const PhotosList = (props) => {
  return (
    <ul className={classes.list}>
      {props.photos.map((photo) => (
        <PhotoItem
          key={photo.id}
          id={photo.id}
          photo={photo.photo}
          title={photo.title}
          address={photo.address}
          description={photo.description}
        />
      ))}
    </ul>
  );
};

export default PhotosList;
