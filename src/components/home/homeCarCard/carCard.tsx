import React, { useState } from "react";
import CarCardModal from "../carCardModal/carCardModal"; 
import styles from "./carCard.module.css";

interface Car {
  id: number;
  name: string;
  year: number;

  price_per_day: number;

  car_brand: string;
  car_type: string;

  penalty_amount: number;
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
      <div className={styles.carDetails}>
        <h2>{car.name}</h2>
        <p>
          <strong>Brand:</strong> {car.car_brand}
        </p>
        <p>
          <strong>Type:</strong> {car.car_type}
        </p>
        <p>
          <strong>Year:</strong> {car.year}
        </p>
        <p>
          <strong>Price per Day:</strong> {car.price_per_day}$
        </p>
        <p>
          <strong>Penalty:</strong> {car.penalty_amount}$
        </p>
      </div>
      <button
        className={styles.bookBtn}
        onClick={() => (isOpen ? closeModal() : openModal())}
      >
        {isOpen ? "Close Modal" : "Book"}
      </button>
      <CarCardModal carId={car.id} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default CarCard;
