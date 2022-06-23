import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import { useState } from "react"

export default function App() {
  //boolean if app is requesting data or not
  const [isLoading, setIsLoading] = useState(false);  
  //list of bank transaction items
  const [transactions, setTransactions] = useState([]);
  //the list of bank transfer items
  const [transfers, setTransfers] = useState([]);
  //any error
  const [error, setError] = useState("");
  //controlled input being useing in filterinput component
  const [filterInputValue, setFilterInputValue] = useState("");
  // state varable object
  const [newTransactionForm, setNewTransactionForm] = useState({category: "", description: "", amount: 0});
  //
  const [isCreating, setIsCreating] = useState(false);


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
        <main>
          <Routes>
            <Route path="/" element={<Home 
            transactions={transactions} setTransactions={setTransactions} 
            transfers={transfers} setTransfers={setTransfers}
            error={error} setError={setError} filterInputValue={filterInputValue}
            isLoading={isLoading} setIsLoading={setIsLoading} 
            newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm} 
            isCreating={isCreating} setIsCreating={setIsCreating} />} />
            <Route path="transaction/:transactionId" element={<TransactionDetail />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
