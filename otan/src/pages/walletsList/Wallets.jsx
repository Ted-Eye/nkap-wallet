import { useEffect, useState, useMemo } from "react";
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'

import {Box, Container, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Typography, Card, CardHeader, CardContent, Tooltip, CardActionArea, Stack} from '@mui/material';
import {SaveAs, CancelOutlined, DeleteOutline, Edit, AddCardOutlined, WalletOutlined, AttachMoneyOutlined, InfoOutline, CallReceivedOutlined, MoveToInboxOutlined, MoveToInbox} from '@mui/icons-material';
import IosShareIcon from '@mui/icons-material/IosShare';

import RechargeForm from "../../components/RechargeForm";
import AddTransaction from "../../components/AddTransaction";
import AllTransactions from "../transactionHistory/allTransactions/AllTransactions";
import dayjs from "dayjs";
import WalletForm from "../../components/forms/WalletForm";
import MyModal from "../../components/modal/Modal";
import SimpleBackdrop from "../../components/utils/BackDrp";
import WalletsProvider from "../../components/WalletsProvider";
import { walletSchema, transactionSchema, walletDefaultValues, transactionDefaultValues } from "../../components/forms/FormSchema";
import { data } from "react-router-dom";
import MyContainer from "../../components/layouts/MyContainer";
import { set } from "zod";



export default function Wallets({}) {
	
	const [bankStatement, setBankStatement]=useState(()=>{
        return JSON.parse(localStorage.getItem('transactions')) || [];
    });
	const [prefs, setPrefs]=  
    useState(()=>{
        return JSON.parse(localStorage.getItem('settings'))||{language:'english', currency:'CFA', theme:'light'}
    })

	const [wallets, setWallets] = useState(()=>{
            return JSON.parse(localStorage.getItem('wallets')) || [{
				id: crypto.randomUUID(),
				title: "Affair N'kap",
				accountType: 'Savings account',
				accountBalance: 5000,
				minBalance: 0,
				monthlyLimit: 0,
				transactions: ['initial'],
				revenues: ['initial'],
				expenses: [],
				status: 'blank',
				note: ''
			},]
        });
	const [editMode, setEditMode] = useState(false);
	const [transactions, setTransactions] = useState(bankStatement);
	const [modalType, setModalType] = useState(null);
	const [initialData, setInitialData] = useState({});
	
	const switchWallets = (id)=>{
		const [selectedWallet] = wallets.filter((wallet)=>wallet.id===id);
		setTargetWallet(selectedWallet);
	}
	const schema = useMemo(()=>(
		modalType === 'transaction' ? transactionSchema : walletSchema
	),[modalType]);

	const defaultValues = useMemo(()=>(
		modalType === 'transaction' ? transactionDefaultValues : walletDefaultValues
	),[modalType])
	

	const methods = useForm({
		resolver: zodResolver(schema),
		defaultValues: modalType==='transaction' ? transactionDefaultValues : walletDefaultValues
	});

	const toggleEditMode = ()=>{
		setEditMode(true);
	}
	const resetEditMode = ()=>{
		setEditMode(false);
	}
	const handleOpenForm = (type, data={})=>{
		if(type==='wallet'){
			methods.reset({
				...walletDefaultValues,
				...data, // data is the wallet to edit
			});
		} else if(type==='transaction'){
			methods.reset({
				...transactionDefaultValues,
				...data, // data is the transaction to edit
			});
		}
		// methods.reset(data);
		setInitialData(data);
		setModalType(type);
	};
	// const toggleEditMode = (id)=>{
	// 	setEditMode(true)
	// 	// const [walletToEdit] = wallets.filter(w=>w.id===id)
	// 	// // handleOpenForm('wallets', walletToEdit)
	// 	// setTargetWallet([walletToEdit])
	// 	// console.log(walletToEdit)
	// }
	// const editWallet = (id)=>{
	// 	const walletToEdit = wallets.filter(wallet=>wallet.id===id);
	// 	setTargetWallet(walletToEdit);
	// 	console.log(targetWallet)};

	const handleCloseForm = ()=>{setModalType(null)}

	// SUBMIT HANDLER FOR WALLETS AND TRANSACTIONS
	const handleFormSubmit = methods.handleSubmit((data)=>{
		if(modalType==='wallet'){
				const [walletToEdit] =  wallets.filter(w=>w.id===data.id)
				if(walletToEdit){
					setEditMode(true)
					const editedWallet = {...data, id: walletToEdit.id};
					const updatedWallets = wallets.map((w)=>w.id===editedWallet.id? editedWallet : w);
					setWallets(updatedWallets);
					handleCloseForm()
				} else {
					setWallets([...wallets, data])
					handleCloseForm()
				}
		}
		else{
			// console.log('Submitting transaction data:', data);
			const associatedWallet = wallets.filter(wallet=>wallet.id===data.walletID)[0];
			setTargetWallet(associatedWallet);

			if(data.type === "Cash-out" && data.amount>parseInt(associatedWallet.accountBalance)){
				alert('Insufficient balance')
				return;
			}
			else if(data.type === "Cash-out" && data.amount >= parseInt(associatedWallet.accountBalance)-parseInt(associatedWallet.minBalance)){
				alert("Can't afford this this item. ");
				return;
			}

			

			const updatedWallet = {
			...associatedWallet, 
			accountBalance: data.type==='Cash-in'? associatedWallet.accountBalance+parseInt(data.amount): associatedWallet.accountBalance-parseInt(data.amount),
			revenues: data.type==='Cash-in'? [...associatedWallet.revenues, data] : associatedWallet.revenues,
			expenses: data.type==='Cash-out'? [...associatedWallet.expenses, data] : associatedWallet.expenses,
			transactions: [...associatedWallet.transactions, data],
			} 
			
			
			const updatedWallets = wallets.map((wallet)=>wallet.id===associatedWallet.id? updatedWallet : wallet);
			setWallets(updatedWallets)

			// const updatedTransaction = {...data, wallet: associatedWallet.title};
			// setdata(updatedTransaction);
			const updatedTransactions = [...transactions, data];
			setTransactions(updatedTransactions);
			localStorage.setItem('wallets', JSON.stringify(wallets));
			localStorage.setItem('transactions', JSON.stringify(transactions));

			handleCloseForm();
			const phrase = data.type==='Cash-in'? 'deposited to' : 'withdrawn from';
			alert(`${prefs.currency} ${data.amount } was ${ phrase } ${associatedWallet.title } successfully!`);
			console.log(associatedWallet);
		}
		
	});



	// const [newTransaction, setNewTransaction] = useState({
    //     id: crypto.randomUUID(),
    //     type: 'Cash-in', 
    //     amount: 0, 
    //     motive: '', 
    //     note: '', 
    //     date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    // })

	

	// 1. WALLET FUNCTIONS (CREATING A NEW WALLET, EDITING AND DELETING WALLETS)

	const updateWalletStatus = ()=>{
		wallets.filter((wallet)=>{
			switch(true){
				case (wallet.transactions.length===0):
					wallet.status='blank';
					wallet.note='Make your first deposit and start growing this wallet !'
					break;
				case (wallet.accountBalance>wallet.minBalance):
					wallet.status='healthy'
					wallet.note='Good job maintaining a rich wallet. Keep it growing !'
					break;
				
				case (wallet.accountBalance<=wallet.minBalance && wallet.expenses.length-wallet.revenues.length<3):
					wallet.status='warning'
					wallet.note='Your wallet is getting low. Consider making a deposit.'
					break;
				case (wallet.expenses.length-wallet.revenues.length>=3):
					wallet.status='sinking'
					wallet.note='Please reduce your spending or this wallet may go bankrupt'
					break;
			}
		})
	}
	useEffect(()=>{
		updateWalletStatus()
	}, [wallets])

	const handleDelete = (id)=>{
		const [deleteWallet] = wallets.filter((wallet)=>wallet.id===id);
		if(deleteWallet===wallets[0]){
			alert("Can't delete default wallet")
		}
		else{
			setWallets(wallets.filter((wallet)=>wallet.id !==id));
			alert(`Wallet: "${deleteWallet.title}" was deleted`)
		}	
	}

	

	
	


	// 2. TRANSACTION FUNCTIONS (DEPOSIT/WITHDRAWAL)

	const openTransactionForm = (id)=>{
		const [walletInstance] = wallets.filter((wallet)=>wallet.id===id);
		// console.log(walletInstance)
		setTargetWallet(walletInstance);
		console.log(targetWallet)
			
	}


	// DEFAULT TRANSACTION MOTIVES

    // useEffect(()=>{
    //     if(newTransaction.type==="Cash-in"){
    //         setNewTransaction(newTransaction=>({...newTransaction, motive:"Salary"}))
    //     }else
    //         {
    //         setNewTransaction(newTransaction=>({...newTransaction, motive: "Shopping"}))
    //     }
    // }, [newTransaction.type])

	// const handleSubmitTransaction = (e)=>{

	// 	e.preventDefault();
		
    //     if(newTransaction.amount==0 || newTransaction.amount===''){
    //         alert('Please enter amount')
	// 		return;

    //     }
    //     else if(newTransaction.type === "Cash-out" && newTransaction.amount>parseInt(targetWallet.accountBalance)){
    //         alert('Insufficient balance')
	// 		return;
    //     }
    //     else if(newTransaction.type === "Cash-out" && newTransaction.amount >= parseInt(targetWallet.accountBalance)-parseInt(targetWallet.minBalance)){
    //         alert("Can't afford this this item. ");
    //         return;
    //     }

		

	// 	const updatedWallet = {
	// 	...targetWallet, 
	// 	accountBalance: newTransaction.type==='Cash-in'? targetWallet.accountBalance+parseInt(newTransaction.amount): targetWallet.accountBalance-parseInt(newTransaction.amount),
	// 	revenues: newTransaction.type==='Cash-in'? [...targetWallet.revenues, newTransaction] : targetWallet.revenues,
	// 	expenses: newTransaction.type==='Cash-out'? [...targetWallet.expenses, newTransaction] : targetWallet.expenses,
	// 	transactions: [...targetWallet.transactions, newTransaction],
    //     } 
		
		
    //     const updatedWallets = wallets.map((wallet)=>wallet.id===targetWallet.id? updatedWallet : wallet);
	// 	setWallets(updatedWallets)

	// 	const updatedTransaction = {...newTransaction, wallet: targetWallet.title};
	// 	setNewTransaction(updatedTransaction);
    //     const updatedTransactions = [...transactions, newTransaction];
    //     setTransactions(updatedTransactions);
	// 	localStorage.setItem('wallets', JSON.stringify(wallets));
	// 	localStorage.setItem('transactions', JSON.stringify(transactions));

	// 	toggleModal()
	// 	const phrase = newTransaction.type==='Cash-in'? 'deposited to' : 'withdrawn from';
	// 	alert(`${prefs.currency} ${newTransaction.amount } was ${ phrase} ${targetWallet.title } successfully!`);
	// }

	// UI UPDATES FROM SIDE EFFECTS
	useEffect(()=>{
		localStorage.setItem('wallets', JSON.stringify(wallets));
	},[wallets])

	useEffect(()=>{
		localStorage.setItem('transactions', JSON.stringify(transactions))

	},[transactions])

	// 3. SHARED FUNCTIONS

	
    return (
		<>

		{/* CODE BELLOW DISPLAYS WALLETS -- WALLETS COMPONENT  */}
		<FormProvider {...methods}>
			<Box >
				<AllWallets 
				handleOpenForm={handleOpenForm}
				handleCloseForm={handleCloseForm}
				handleFormSubmit={handleFormSubmit}
				toggleEditMode={toggleEditMode}
				resetEditMode={resetEditMode}
				initialData={initialData}
				modalType={modalType}
				editMode={editMode}
				defaultValues={defaultValues} 
				prefs={prefs}
				bankStatement={bankStatement}
				wallets={wallets}/>
			</Box>
			<Box>
			<Container>
				<Typography variant="h6" gutterBottom>
					{ `My wallets (${wallets.length}):`}
				</Typography>
				
				{
					wallets.map((wallet, id)=>
						( 
					<Box key={id}
							sx={{  mt: '20px', color: 'white'}}>
					<Card sx={{ bgcolor: 'lightblue', borderStyle: 'solid', borderWidth: '1px'}}>
							<Typography 
								sx={{ bgcolor: 'crimson', mb: '0px', color: 'white'}}
								variant="h6" gutterBottom>								
								<WalletOutlined />
								{ wallet.title}
							</Typography>
					<CardContent sx={{ bgcolor: '#cfe8fc', borderColor: 'crimson'}}>
							<br />
							<Typography variant="h4" gutterBottom>
								{`Balance: ${prefs.currency }  ${ wallet.accountBalance} `}
							</Typography>
							<br />

							<Typography variant="p" gutterBottom>
								{`Monthly Limit: ${prefs.currency }  ${ wallet.monthlyLimit} `}
							</Typography>
							<Box>
								<Typography variant="p" gutterBottom>
									status: { wallet.status}
								</Typography>
							<br />
								<Typography variant="p" gutterBottom>
								{
									wallet.note
								}
							</Typography>
							
							</Box>
					</CardContent>
					<Box sx={{paddingTop:'25px', paddingBottom: '10px', backgroundColor: '#cfe8fc'}}>
						<span style={{}}> 
								<Button 
								onClick={()=>{handleOpenForm('transaction', {...defaultValues, id:crypto.randomUUID(), date: dayjs().toDate(), motive: 'Shopping', type: 'Cash-in', wallet: wallet.title, walletID: wallet.id})}}
								style={{textTransform: 'none', 
										padding: 	'5px', marginRight: '55px'}}
										variant="outlined"
										>
									{/* <AddCardOutlined/> */}
									+ Transaction
									<AttachMoneyOutlined/>
								</Button>
							</span>
							
							<span style={{padding: '5px'}}>
								<Button	
								onClick={()=>{handleOpenForm('wallet', wallet),toggleEditMode()}}
								style={{textTransform: 'none', padding: '5px'}} variant="outlined">Edit<Edit/>
								</Button>
							</span>
								
							<Button variant="outlined"
									onClick={()=>handleDelete(wallet.id)}
									style={{textTransform: 'none'}}>
								Delete
							<DeleteOutline/>
							</Button>
							<Button 
								variant="outlined"
								style={{textTransform: 'none'}}
									>
							Wallet details
							<InfoOutline/>
							</Button>
					</Box>
					</Card>

					<WalletsCard 
						wallet={wallet} 
						transactionDefaultValues={transactionDefaultValues}
						defaultValues={defaultValues}
						key={id}
						prefs={prefs}
						handleCloseForm={handleCloseForm}
						handleOpenForm={handleOpenForm}
						toggleEditMode={toggleEditMode}
						handleDelete={handleDelete}
						/>

				<Box/>
			</Box>
						)
					)
				}

				<Box>
						<Button 
					onClick={() => handleOpenForm('wallet', {...defaultValues, id:crypto.randomUUID()})}
						variant="outlined"
									style={{textTransform: 'none', marginTop: 25}}>
							Create a new wallet
							</Button>
					</Box>



				{/* MODAL FORMS */}
			<Box>
				<MyModal isOpen={!!modalType} onClose={handleCloseForm}
				>
					<Box >
								{
							modalType==='wallet'&& <WalletForm initialData={initialData} onSubmit={handleFormSubmit} onClose={handleCloseForm}
							editMode={editMode}
							resetEditMode={resetEditMode}
							/>
						}
						{
							modalType==='transaction'&& <AddTransaction initialData={initialData} onSubmit={handleFormSubmit} onClose={handleCloseForm}/>
						}

							</Box>	
				</MyModal>
			</Box>
			</Container>
		</Box>
		</FormProvider>
	</>

	)
}
