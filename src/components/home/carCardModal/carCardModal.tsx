import React, { useState, useEffect } from "react";
import styles from "./carCardModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: number;
  bailAmount: number;
}

const CarCardModal: React.FC<ModalProps> = ({ isOpen, onClose, carId, bailAmount }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleSend = async () => {
    if (!isButtonActive || isLoading) return;
    setIsLoading(true);

    try {
      const requestBody = {
        expected_return_date: endDate?.toISOString().split('T')[0],
      };

      const response = await fetch(`http://127.0.0.1:8000/api/v1/rent-car/Taras-cp/${carId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to book the car');
      }

      console.log('Car booked successfully');
      onClose();
    } catch (error:any) {
      console.error('Error booking the car:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Book Car</h2>
              <button className={styles.closeButton} onClick={onClose}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div>
                <label>Bail amount: </label> {bailAmount}$
              </div>
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
                disabled={!isButtonActive || isLoading}
                className={styles.sendButton}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCardModal;
