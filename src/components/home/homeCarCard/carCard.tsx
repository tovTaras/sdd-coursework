import React, { useState } from "react";
import CarCardModal from "../carCardModal/carCardModal"; // Correct import with uppercase C
import styles from "./carCard.module.css";

interface Car {
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
  image: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.carCard}>
      <img src={car.image} alt={car.name} className={styles.carImage} />
      <div className="car-details">
        <h2>{car.name}</h2>
        <p>
          <strong>Model:</strong> {car.model}
        </p>
        <p>
          <strong>Year:</strong> {car.year}
        </p>
        <p>
          <strong>Price per Day:</strong> ${car.pricePerDay}
        </p>
        <p>
          <strong>Available:</strong> {car.available ? "Yes" : "No"}
        </p>
      </div>
      <button
        className={styles.bookBtn}
        onClick={() => (isOpen ? closeModal() : openModal())}
      >
        {isOpen ? "Close Modal" : "Book"}
      </button>
      <CarCardModal isOpen={isOpen} onClose={closeModal} />{" "}
      {/* Correct usage with uppercase C */}
    </div>
  );
};

export default CarCard;
