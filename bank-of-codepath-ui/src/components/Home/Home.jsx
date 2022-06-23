import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

import { useEffect } from "react"
import axios from "axios"
import { API_BASE_URL } from "../../constants"

export default function Home(props) {
  const {
    error, setError,
    transactions, setTransactions,
    filterInputValue,
    isCreating, setIsCreating, 
    newTransactionForm, setNewTransactionForm
  } = props;

  useEffect(() => {
    async function getData() {
      props.setIsLoading(true);
      try {
        const responseTransactions = await axios.get(API_BASE_URL + "/bank/transactions");
        if (responseTransactions?.data?.transactions) {
          props.setTransactions(responseTransactions.data.transactions);
        }
        const responseTransfers = await axios.get(API_BASE_URL + "/bank/transfers");
        if (responseTransfers?.data?.transfers) {
          props.setTransfers(responseTransfers.data.transfers);
        }
      } catch (error) {
        props.setError(error);      
        console.log(props.error);
      } finally {
        props.setIsLoading(false);
      }
    }
    getData()
  }, []);

  const filteredTransactions = (filterInputValue
    ? props.transactions?.filter(transaction => { 
        return transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase())})
    : props.transactions ) ;

  function handleOnSubmitNewTransaction() {

  }

  async function handleOnCreateFunction() {
    setIsCreating(true);
    axios.post(`${API_BASE_URL}/bank/transactions`, {transaction:newTransactionForm})
      .then((response) => {
        console.log(response);
        const data = response.data.transaction;
        setTransactions(transactions => [...transactions, {...data}]);
      }, (error) => {
        setError(error);
      });
    setIsCreating(false);
    setNewTransactionForm("", "", 0);
  }

  return (
    <div className="home">
      {props.error ? <h2 className="error">Error message</h2> : null}
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating}
      form={newTransactionForm} setForm={setNewTransactionForm} 
      handleOnSubmit={handleOnCreateFunction} />
      { props.isLoading ? <h1>Loading...</h1> : 
      <BankActivity transactions={filteredTransactions}
      transfers = {props.transfers}/> }
    </div>
  )
}
