import React, { useState } from "react";
import styles from "./home.module.css";
import CarCard from "../../components/home/homeCarCard/carCard";
import Navbar from "@/components/home/navbar/navbar";

export default function Home() {
  const initialCarData = [
    {
      name: "Toyota Camry",
      model: "Sedan",
      year: 2022,
      pricePerDay: 50,
      available: true,
      image:
        "https://global.toyota/pages/news/images/2017/07/10/1330/20170710_01_kv_w1920_2.jpg",
    },
    {
      name: "Honda Civic",
      model: "Sedan",
      year: 2023,
      pricePerDay: 60,
      available: false,
      image: "https://example.com/honda-civic.jpg",
    },
  ];

  const [carData, setCarData] = useState(initialCarData);

  const [filteredPrice, setFilteredPrice] = useState<number | null>(null);

  const handleFilterChange = (price: number | null) => {
    setFilteredPrice(price);
  };

  const handleSortByAvailability = (date: Date) => {
    console.log("Sorting by availability:", date);
  };

  const filteredCars = carData.filter((car) => {
    if (filteredPrice === null) {
      return true;
    }
    return car.pricePerDay <= filteredPrice;
  });

  return (
    <div>
      <Navbar
        onFilterChange={handleFilterChange}
        onSortByAvailability={handleSortByAvailability}
      />
      <div className={styles.carList}>
        {filteredCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
}
