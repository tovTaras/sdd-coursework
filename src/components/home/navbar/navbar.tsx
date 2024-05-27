import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./navbar.module.css";

interface NavbarProps {
  onFilterChange: (price: number | null) => void;
  onClearFilters: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange, onClearFilters }) => {
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
      <div>
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
