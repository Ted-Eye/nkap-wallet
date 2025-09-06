import { useEffect, useState } from "react";

import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Typography, Card, CardHeader, CardContent, Tooltip, CardActionArea} from '@mui/material';

import {SaveAs, CancelOutlined, DeleteOutline, Edit, AddCardOutlined, WalletOutlined, AttachMoneyOutlined, InfoOutline} from '@mui/icons-material'
import RechargeForm from "../../components/RechargeForm";

export default function Wallets() {
    const [wallets, setWallets] = useState(()=>{
            return JSON.parse(localStorage.getItem('wallets')) || []
        })
	
    const [newWallet, setNewWallet] = useState({
		id: crypto.randomUUID(),
        title: '',
        accountType: 'Savings account',
        accountBalance: 0,
		minBalance: 0,
		monthlyLimit: 0,
		transactions: [],
		revenues: [],
		expenses: []
    })
	const [targetWallet, setTargetWallet] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	

    const handleChange = (e)=>{
		setNewWallet({...newWallet, [e.target.name]: e.target.value})
	}
	const handleSave = (e)=>{
		e.preventDefault()
		setWallets([...wallets, newWallet])
		alert(`Wallet: "${newWallet.title}" was created successfully`);
		console.log(newWallet)
		setNewWallet({
		id: crypto.randomUUID(),
        title: '',
        accountType: 'Savings account',
        accountCurrency: 'FCFA',
        accountBalance: 0,
		minBalance: 0,
		monthlyLimit: 0
    })
		
		// onSave(userSettings)
	}

	

	const handleDelete = (id)=>{
		// const updatedWallets = wallets.filter((wallet)=>wallet.id !==id);
		const [deletedWallet] = wallets.filter((wallet)=>wallet.id===id);
		console.log(deletedWallet)
		alert(`Wallet: "${deletedWallet.title}" was deleted`)
		setWallets(wallets.filter((wallet)=>wallet.id !==id));
		
	}

	const handleTopUpOpen = (id)=>{
		const [walletInstance] = wallets.filter((wallet)=>wallet.id===id);
		console.log(walletInstance)
		setTargetWallet(walletInstance)
		setOpenModal(true) 
		
		
	}
	const cancelTopUp = ()=>{
		setOpenModal(!openModal)
	}
	
	
	useEffect(()=>{
		localStorage.setItem("wallets", JSON.stringify(wallets))
	},[wallets])

    return (
		<>



		{/* FORM COMPONENT TO CREATING A NEW WALLET */}
		{/* <Box 
			component="form"
			// sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
			sx={{ bgcolor: '#cfe8fc', width: 'xl'}}
			noValidate
			autoComplete="off"
		>
			<Box className="create-wallet-form">
				<Typography variant="h5" gutterBottom>
					Create a new wallet:
				</Typography>

                <FormControl sx={{ m: 1 }}>
					<InputLabel id="account-type">Account type</InputLabel>
					<Select
					labelId="select-account"
					id="select-account"
					value={newWallet.accountType}
					label="Account type"
					name="accountType"
					onChange={handleChange}
					>
					<MenuItem value="Current account">Current account</MenuItem>
					<MenuItem value="Savings account">Savings account</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1 }}>
					<InputLabel 
					htmlFor = "title"
					id="wallet-title">Title</InputLabel>
                    <OutlinedInput 
                    required 
                    id="wallet-title"
					// label='Title'
                    label="Title"
					name="title"
					value={newWallet.title}
                    onChange={handleChange}
                    placeholder="Enter a title for this wallet"
                />
                </FormControl> 

				<FormControl sx={{ m: 1 }}>
					<InputLabel  htmlFor="minimum balance">Min Balance</InputLabel>
					<OutlinedInput
						id="filled-adornment-amount"
						value={newWallet.minBalance}
						name="minBalance"
						onChange={handleChange}
						label="Min Balance"
						startAdornment={<InputAdornment position="start">{newWallet.accountCurrency}</InputAdornment>}
					/>
				</FormControl>
				
				<FormControl sx={{ m: 1 }}>
					<InputLabel  htmlFor="monthly-limit">Monthly Limit</InputLabel>
					<OutlinedInput
						id="filled-adornment-amount"
						label="Monthly Limit"
						value={newWallet.monthlyLimit}
						name="monthlyLimit"
						onChange={handleChange}
						startAdornment={<InputAdornment position="start">{newWallet.accountCurrency}</InputAdornment>}
					/>
				</FormControl>
				<Box>
					<Button 
						variant="outlined"
						style={{textTransform: 'none'}}
						>
					<CancelOutlined/>Cancel
				</Button>
				<Button 
						onClick={handleSave}
						variant="outlined"
						style={{textTransform: 'none'}}
						>
					<SaveAs/>Create wallet
				</Button>
				</Box>
			</Box>
		</Box> */}




		{/* CODE BELLOW DISPLAYS WALLETS -- WALLETS COMPONENT  */}

		<Box>
				<Typography variant="h6" gutterBottom>
					{ `My wallets (${wallets.length}):`}
				</Typography>
				
				{
					wallets.map((wallet, id)=>
						(
					<Box key={id}
							sx={{ bgcolor: '#cfe8fc', mt: '20px', color: 'white'}}>
					<Card sx={{ bgcolor: 'lightblue', borderStyle: 'solid', borderWidth: '1px'}}>
							<Typography 
								sx={{ bgcolor: 'crimson', mb: '0px', color: 'white'}}
								variant="h6" gutterBottom>
								
								{/* {wallet.title} */}
								
								<WalletOutlined />
								{ wallet.title}
							
							</Typography>
					<CardContent sx={{ bgcolor: '#cfe8fc', borderColor: 'crimson'}}>
							
							{/* <Typography variant="p" gutterBottom>
								{`Min Balance: ${wallet.accountCurrency }${wallet.minBalance} `}
							</Typography> */}
							<br />
							<Typography variant="p" gutterBottom>
								{`Balance: ${wallet.accountCurrency }  ${ wallet.accountBalance} `}
							</Typography>
							<br />
							
					</CardContent>
					<Box sx={{paddingTop:'25px', paddingBottom: '10px', backgroundColor: '#cfe8fc'}}>
						<span style={{}}>
								<Button 
								onClick={()=>handleTopUpOpen(wallet.id)}
								style={{textTransform: 'none', 
										padding: 	'5px', marginRight: '55px'}}
										variant="outlined"
										>
									{/* <AddCardOutlined/> */}
									+
									<AttachMoneyOutlined/>
								</Button>
							</span>
							
							<span style={{padding: '5px'}}>
								<Button	
								style={{textTransform: 'none', padding: '5px'}} variant="outlined"><Edit/></Button>
							</span>
								
							<Button variant="outlined"
									onClick={()=>handleDelete(wallet.id)}
									style={{textTransform: 'none'}}>
							<DeleteOutline/>
							</Button>
							<Button variant="outlined"
									style={{textTransform: 'none'}}>
							<InfoOutline/>
							</Button>
					</Box>
					</Card>
				</Box>
						)
					)
				}
				{
						openModal&& (<Box>
							{/* <Typography variant="h4">
								Top up your wallet
							</Typography>
							<Button 
									onClick={cancelTopUp}
									variant="outlined"
									style={{textTransform: 'none'}}>
							Cancel
							</Button>
							<Button 
									// onClick={handleSubmit}
									variant="outlined"
									style={{textTransform: 'none'}}>
							Submit
							</Button> */}
							<RechargeForm handleSubmit={handleSave}/>
						</Box>)
					}
			</Box>
	</>
	
	)
}
