import React, { useState } from "react";
import styles from "./financialReportItem.module.css";


interface FinancialReportItemProps {
  reportItem: any;
}


const FinancialReportItem: React.FC<FinancialReportItemProps> = ({ reportItem }) => {

  return (
    <div className={styles.reportItem}>
      <div className={styles.reportItemDetails}>
        <h2>{reportItem['car_name']}</h2>
        <p>
          <strong>Total income:</strong> {reportItem['total_income']}
        </p>
        <p>
          <strong>Total penalties:</strong> {reportItem['total_penalties']}
        </p>
      </div>
    </div>
  );
};

export default FinancialReportItem;
