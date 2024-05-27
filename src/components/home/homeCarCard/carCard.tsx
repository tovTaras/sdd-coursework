import React, { useState } from "react";
import CarCardModal from "../carCardModal/carCardModal"; 
import styles from "./carCard.module.css";
import {Car} from "../../../interfaces/carInterfaces"



interface CarCardProps {
  car: Car;
  bailAmount?: number;
}





const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleBailAmount = Math.round(car.price_per_day + car.price_per_day*1.1)
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
        onClick={openModal}
      >
       Book
      </button>
      <CarCardModal carId={car.id} isOpen={isOpen} onClose={closeModal} bailAmount={handleBailAmount} />
    </div>
  );
};

export default CarCard;
