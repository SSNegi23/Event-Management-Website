import { useEffect, useState } from "react";
import "../styles/Event.css";

const Event = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const fetchImages = async () => {
    try {
      const images = []; // Temporary array to store images
      for (let i = 0; i < 10; i++) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${i + 1}`
        );
        const data = await response.json();
        images.push(data);
      }
      setImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  console.log("images: ", images);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="event-container">
      <div className="container-I">
        <div className="title-container ">Title</div>
        <div className="details-container flex">
          <div className="photo-carousle flex-1">
            <button onClick={handlePrev}>Prev</button>
            {images && images.length ? (
              images.map((imageItem, index) => (
                <img
                  src={imageItem.url}
                  alt={imageItem.title}
                  key={imageItem.id}
                  title={index+1}
                  className={
                    currentImage === index
                      ? "current-image"
                      : "current-image hide-current-image"
                  }
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
            <button onClick={handleNext}>Next</button>
          </div>
          <div className="description flex-1">Description</div>
        </div>
        <div className="button-container">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
        </div>
      </div>
      <div className="container-II flex">
        <div className="rules-guidlines">
          <p>Rules & Guidlines</p>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          </ul>
        </div>
        <div className="contact">Contact</div>
      </div>
    </div>
  );
};

export default Event;
