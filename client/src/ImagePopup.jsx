import "./ImagePopup.css";

function ImagePopup({ image, onClose }) {
  const handleContainerClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-popup-container" onClick={handleContainerClick}>
      <div className="image-popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="image-wrapper">
          <img src={image} alt="Popup" className="popup-image" />
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;