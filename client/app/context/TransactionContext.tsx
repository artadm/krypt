"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { ethers } from "ethers";

import { contractABI, contractAddress} from "../utils/constants.js"

export const TransactionsContext = React.createContext()

let ethereum: any;
if (typeof window !== "undefined") {
  // safe to use window
   ethereum = window['ethereum'];
}
const getEthereumContract = async () => {
	const provider = new ethers.BrowserProvider(ethereum)
	const signer =  await provider.getSigner();
	const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
	return transactionContract;
}


export const TransactionProvider = ({children}: {children: ReactNode}) => {
	const [currentAccount, setCurrentAccount] = useState()
	const [ formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''})
	const [isLoading, setIsLoading] = useState(false)
	const [transactions, setTransactions] = useState([])


	const handleChange = (e: any, name: string) => {
		setFormData((prevState) => ({...prevState, [name]: e.target.value}))
	}

	const getAllTransactions = async () => {
		try {
			if(!ethereum) return alert("Please install Metamask")
			const transactionContract = await getEthereumContract()
			const availableTransactions = await transactionContract.getAllTransactions() 
			const structuredTransactions = availableTransactions.map((transaction: any) => ({
				addressTo: transaction.receiver,
				addressFrom: transaction.sender,
				timestamp: new Date(parseInt(transaction.timestamp.toString()) * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount) / (10 ** 18)
			}))
			console.log(structuredTransactions)
			setTransactions(structuredTransactions)
		} catch(error) {
			console.log(error)
		}
	}

	const checkIfWalletConnected =  async() => {
		try {
			if(!ethereum) return alert("Please download or connect Metamask Wallet :)")

			const accounts = await ethereum.request({method: 'eth_accounts'})

			if(accounts.length) {
				setCurrentAccount(accounts[0])
				getAllTransactions()
			} else {
				console.log("No accounts found")
			}
		} catch (error) {
			console.log(error)
			throw new Error("No ethereum account")
		}
	}

	const connectWallet = async () => {
		try {
				if(!ethereum) return alert("Please download or connect Metamask Wallet :)")
				const accounts = await ethereum.request({method: 'eth_requestAccounts'})
				setCurrentAccount(accounts[0])
		} catch(error) {
			console.log(error)
			throw new Error("No ethereum account")
		}
	}

	const checkIfTransactionsExist = async() => {
		try {
      if (ethereum) {
        const transactionsContract = await getEthereumContract()
        const currentTransactionCount = await transactionsContract.getTransactionCount();

      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
	}

	const sendTransactions = async () => {
		try {
			if(!ethereum) return alert("Please download or connect Metamask Wallet :)")
			const {addressTo, amount, keyword, message} = formData;
			const transactionContract = await getEthereumContract()
			const parsedAmount = ethers.toBeHex(ethers.parseEther(amount))
			await ethereum.request({
				method: 'eth_sendTransaction',
				params: [{
					from: currentAccount, 
					to: addressTo,
					gas: '0x5208',
					value: parsedAmount
				}]
			})
			const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
			
			setIsLoading(true)
			console.log(`loading... - ${transactionHash}`)
			
			await transactionHash.wait()

			setIsLoading(false)
			console.log(`Success - ${transactionHash}`)
			
			const transactionsCount = await transactionContract.getTransactionCount()
		} catch(error) {
			console.log(error)
			throw new Error("Smth went wrong")
		}
	}

	useEffect(() => {
		checkIfWalletConnected()
		checkIfTransactionsExist()
	}, [])
	return (
		<TransactionsContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransactions, transactions, isLoading}}>
			{children}
		</TransactionsContext.Provider>
	)
}