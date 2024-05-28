import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import CarCard from "../../components/home/homeCarCard/carCard";
import Navbar from "@/components/home/navbar/navbar";
import {Car} from "../../interfaces/carInterfaces"

export default function Home() {
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPrice, setFilteredPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auto-park-list/Taras-cp/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'X-Session-Key': localStorage.getItem('authToken') || '',  
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarData(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarData();
  }, []);

  const handleClearFilters = () => {
    setFilteredPrice(null);
  };

  const handleFilterChange = (price: number | null) => {
    setFilteredPrice(price);
  };

  const filteredCars = carData
  .flatMap((item) => item.cars)
  .filter((car: Car) => {
    if (filteredPrice === null) {
      return true;
    }
    return car.price_per_day <= filteredPrice;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  return (
    <div>
      <Navbar
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <div className={styles.carList}>
      {filteredCars.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
