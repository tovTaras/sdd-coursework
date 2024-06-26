import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./navbar.module.css";
import { useRouter } from 'next/router';

interface NavbarProps {
  onFilterChange: (price: number | null) => void;
  onClearFilters: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange, onClearFilters }) => {
  const router = useRouter();
  const [customPrice, setCustomPrice] = useState<string>("");

  const handleCustomPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrice(event.target.value);
  };

  const handleApplyPrice = () => {
    const price = parseFloat(customPrice);
    if (!isNaN(price)) {
      onFilterChange(price);
    } else {
      onFilterChange(null);
    }
  };

  const handleClearFilters = () => {
    setCustomPrice("");
    onClearFilters();
  };

  return (
    <nav className={styles.navbar}>
      <button className={styles.applyButton} onClick={() => {
          router.push('/availability-report')
        }}>
        Availability Report
      </button>
      <button className={styles.applyButton} onClick={() => {
          router.push('/financial-report')
        }}>
        Financial Report
      </button>
      <div className={styles.priceDiv}>
        <div>PRICE</div>
        <input
          className={styles.customPriceInput}
          type="number"
          placeholder="Enter custom price"
          value={customPrice}
          onChange={handleCustomPriceChange}
        />
      </div>
      <button className={styles.applyButton} onClick={handleApplyPrice}>
        Apply Filters
      </button>
      <button className={styles.applyButton} onClick={handleClearFilters}>
        Clear Filters
      </button>
    </nav>
  );
};

export default Navbar;
