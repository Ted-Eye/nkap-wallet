import React, { useEffect, useState } from 'react'

const UserPreferences = ({userSettings}) => {

    // const [settings, setSettings] = useState({})

    // const getGetUserSettings = () =>{
    //     const savedSettings = JSON.parse(localStorage.getItem('settings'))
    //     setSettings(savedSettings)
    // }
    
    // useEffect(()=>{
    //     getGetUserSettings();
    //     console.log(settings)
    // },[])
    return (
        <div>
				<h3>User Preferences</h3>
				<div>
					<p> currency: {
						userSettings.currency
					}</p>
					<p> Marginal Balance: {
						userSettings.marginalBalance
					}</p>
					{/* <p> Purchasing Power: {
						userSettings.purchasingPower
					}</p> */}
					<p> Monthly limit: {
						userSettings.monthlyLimit
					}</p>
				</div>
			</div>
    )
}

export default UserPreferences
