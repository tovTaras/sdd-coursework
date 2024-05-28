import React, { useState } from "react";
import styles from "./availabilityReportItem.module.css";


interface AvailabilityReportItemProps {
  reportItem: any;
}


const AvailabilityReportItem: React.FC<AvailabilityReportItemProps> = ({ reportItem }) => {

  return (
    <div className={styles.reportItem}>
      <div className={styles.reportItemDetails}>
        <h2>{reportItem['car_name']}</h2>
        <p>
          <strong>Total rents:</strong> {reportItem['total_rents']}
        </p>
        <p>
          <strong>Active rents:</strong> {reportItem['active_rents']}
        </p>
        <p>
          <strong>Availability status:</strong> {reportItem['availability_status']}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityReportItem;
