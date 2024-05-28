import React, { useState, useEffect } from "react";
import styles from "./financialReport.module.css";
import { useRouter } from 'next/router';
import FinancialReportItem from "../../components/financial-report/financialReportItem/financialReportItem";


export default function FinancialReport() {
    const router = useRouter();
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchReport = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/reports/Taras-cp/car-financial/', {
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
          setReportData(data);
        } catch (error:any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReport();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
   
    return (
      <div>
        <button className={styles.applyButton} onClick={() => {
          router.push('/home')
        }}>Go Back</button>
        <div className={styles.reportItemsList}>
          {reportData.map((reportItem: any) => (
            <FinancialReportItem key={reportItem['car_id']} reportItem={reportItem} />
          ))}
        </div>
      </div>
    );
  }
  