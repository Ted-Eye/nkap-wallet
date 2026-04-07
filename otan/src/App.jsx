
import './App.css'
import { useEffect, useMemo, useState } from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { ModalProvider } from './refactor/contexts/ModalContext';
import { PrefsProvider } from './refactor/contexts/PrefsContext';
import { WalletProvider } from './refactor/contexts/WalletContext';
import HomePage from './refactor/pages/HomePage';
import WalletsPage from './refactor/pages/WalletsPage';
import TransactionsPage from './refactor/pages/TransactionsPage';
import SettingsPage from './refactor/pages/SettingsPage';
import AppModal from './refactor/components/global/AppModal';
import WalletDetailsPage from './refactor/pages/WalletDetailsPage';
import TransactionDetailsPage from './refactor/pages/TransactionDetailsPage';
import { FundingProvider } from './refactor/contexts/FundingAccContext';
import NavigationBar from './refactor/components/global/NavigationBar';
import NotFound from './refactor/pages/NotFound';
import LoginPage from './refactor/pages/LoginPage';
import RegisterPage from './refactor/pages/RegisterPage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './refactor/lib/konstants/Defaults';
import ProtectedRoutes from './refactor/components/global/ProtectedRoutes';
import LandingPage from './refactor/pages/LandingPage';
import { useAuth } from './refactor/contexts/AuthContext';
import LoadingIndicator from './refactor/components/global/LoadingIndicator';
import BgContainer from './refactor/components/global/BgContainer';
import { AlertComponent } from './refactor/components/global/alerts';
import { AlertProvider } from './refactor/contexts/AlertContext';

function logout() {
    localStorage.clear(ACCESS_TOKEN, REFRESH_TOKEN)
    return <Navigate to='/login'/>
}
function registerAndLogout() {
    localStorage.clear(ACCESS_TOKEN, REFRESH_TOKEN)
    return <RegisterPage/>
}

function App() {
    // const [bankStatement, setBankStatement]=useState(()=>{
    //     return JSON.parse(localStorage.getItem('transactions')) || [];
    // });
	// const [prefs, setPrefs]=  
    // useState(()=>{
    //     return JSON.parse(localStorage.getItem('settings'))||{language:'english', currency:'CFA', theme:'light'}
    // })
    const {isAuth, loading} = useAuth()
    



	return (
		<AlertProvider>
            <ModalProvider>
			<PrefsProvider>
				<WalletProvider>
                    <FundingProvider>
                        <NavigationBar/>
                        <AppModal/>
                        {loading&& <LoadingIndicator/>}
                        <BgContainer>
                            <AlertComponent/>
                            <Routes>
                        <Route path='/' element={<LandingPage/>}></Route>
						<Route path='/home' element={<ProtectedRoutes>
                            <HomePage/>
                        </ProtectedRoutes>}></Route>
                        <Route path='/login' element={<LoginPage/>}></Route>
                        <Route path='/register' element={<RegisterPage/>}></Route>
						<Route path='/wallets' element={<WalletsPage/>}></Route>
						<Route path='/transactions' element={<TransactionsPage/>}></Route>
						<Route path='/settings' element={<SettingsPage/>}></Route>
                        <Route path='/wallets/:title' element={<WalletDetailsPage/>}></Route>
                        <Route path='/transactions/:id' element={<TransactionDetailsPage/>}></Route>
                        <Route path='*' element={<NotFound/>}></Route>
					</Routes>
                        </BgContainer>
                    </FundingProvider>
                    {/* {
                        isAuth&& <NavigationLinks/>
                    } */}
				</WalletProvider>
			</PrefsProvider>
		</ModalProvider>
        </AlertProvider>
	)
    // return <>
    //         <NavBar/>
    //             <Routes> 
                    
    //                 <Route path='/wallets' element= {
    //                     <AllWallets bankStatement={bankStatement}/>
    //                 }/>
    //                 <Route path='/preferences' element={
    //                     <Preferences 
    //                         prefs={prefs}
    //                         />
    //                 }/>
    //                 <Route path='/transactions' element={
    //                     <AllTransactions
    //                         bankStatement={bankStatement}
    //                         prefs={prefs}
    //                     />
    //                 }/>
    //                 <Route path='/' element={<Home 
    //                     bankStatement={bankStatement}
    //                     wallets={wallets} 
    //                     targetWallet={targetWallet}
	// 					transactionDefaultValues={transactionDefaultValues}
	// 					defaultValues={defaultValues}
	// 					prefs={prefs}
	// 					handleCloseForm={handleCloseForm}
	// 					handleOpenForm={handleOpenForm}
	// 					toggleEditMode={toggleEditMode}
	// 					handleDelete={handleDelete}

    //                     />}/>
    //             </Routes>
    //             {/* <Sidebar/> */}
    // </>
    }

    export default App
