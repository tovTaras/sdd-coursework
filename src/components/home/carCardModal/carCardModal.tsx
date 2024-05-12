import React, { useState, useEffect } from "react";
import styles from "./carCardModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarCardModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  useEffect(() => {
    if (startDate && endDate) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSend = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <label>Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className={styles.datePicker}
              />
            </div>
            <div>
              <label>End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={startDate || new Date()}
                className={styles.datePicker}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!isButtonActive}
              className={styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCardModal;
