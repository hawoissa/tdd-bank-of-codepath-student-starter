import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API_BASE_URL } from "../../constants"

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  
  const transactionId = useParams()?.transactionId;

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setHasFetched(false);
      try {
        const response = await axios.get(API_BASE_URL + "/bank/transactions/" + transactionId);      
        setTransaction(response.data.transaction);      
      } catch (error) {
        setIsError(error);      
      }
      setIsLoading(false);
      setHasFetched(true);
    }
    getData()
  }, []);


  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null }) {
  let length = (Object.keys(transaction)).length == 0;
  return (
     <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        {length ? (<h1>Not Found</h1>) : null}
        <p className="category">{transaction.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
     
    
  )
}
