import './styles/TransactionCard.css'
export default function TransactionCard({transaction, handleCancel, userSettings, recentTransactions}) {

    return (
        <>
            <div>
                <div className='transaction-card'
                    style={transaction.type ==='Cash-in'? {background: 'green'}: {background: 'red'}}
                >
                    <h5>
                        {transaction.type}
                    </h5>
                    {/* {
                            transaction.type === 'Cash-in' ? <p>
                                Source: { transaction.motive}
                            </p>
                            : <p>Motive: <br />{ transaction.motive}</p>
                        } */}
                    
                    <p>
                        {transaction.type === "Cash-in"?
                        `+ ${transaction.amount} ${ userSettings.currency}`
                        : `- ${transaction.amount} ${ userSettings.currency}`}
                    </p>
                    <button>Details</button>
                </div>
                {/* <div><button>Full details</button></div>
                <button onClick={()=>handleCancel(transaction.id)}>Cancel</button>
                <button>Edit</button> */}
            </div>
        </>
    )
}
