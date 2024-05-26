import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import CarCard from "../../components/home/homeCarCard/carCard";
import Navbar from "@/components/home/navbar/navbar";

export default function Home() {
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPrice, setFilteredPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auto-park-list/Taras-cp/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  const handleFilterChange = (price: number | null) => {
    setFilteredPrice(price);
  };

  const handleSortByAvailability = (date: Date) => {
    console.log("Sorting by availability:", date);
  };

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
        onSortByAvailability={handleSortByAvailability}
      />
      <div className={styles.carList}>
        {carData.map((item) => (
          item.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ))}
      </div>
    </div>
  );
}
