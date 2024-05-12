import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./navbar.module.css";

interface NavbarProps {
  onFilterChange: (price: number | null) => void;
  onSortByAvailability: (date: Date) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onFilterChange,
  onSortByAvailability,
}) => {
  const [customPrice, setCustomPrice] = useState<string>("");
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);

  const handleCustomPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleDateChange = (date: Date | null) => {
    setAvailabilityDate(date);
  };

  const handleApplyFilters = () => {
    if (availabilityDate) {
      onSortByAvailability(availabilityDate);
    }
    if (customPrice !== "") {
      const price = parseFloat(customPrice);
      if (!isNaN(price)) {
        onFilterChange(price);
      } else {
        onFilterChange(null);
      }
    }
  };

  return (
    <>
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
        <div>
          <div>AVAILABLE FROM</div>
          <DatePicker
            className={styles.availabilityInput}
            selected={availabilityDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select availability date"
          />
        </div>
        <button className={styles.applyButton} onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </nav>
    </>
  );
};

export default Navbar;
