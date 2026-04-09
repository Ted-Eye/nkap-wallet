import React from 'react'

export default function ExpenseMotives({Select, MenuItem, name, type, motive, handleChange}) {
    return (
        <>
            <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={motive}
                    label={type === "Cash-out"? "Motive": "Source"}
                    name={name}
                    color={type === "Cash-out"? 'warning': "success"}
                    onChange={handleChange}
                    >
                    <MenuItem value="Shopping">Shopping</MenuItem>
                    <MenuItem value="rents">Rents</MenuItem>
                    <MenuItem value="deposit">Deposit(to some other account)</MenuItem>
                    <MenuItem value="gifted">Gifted</MenuItem>
                    <MenuItem value="bill">Bill</MenuItem>
                    <MenuItem value="loan">Lending</MenuItem>
                    <MenuItem value="repayment">Repayment(loan/debt...)</MenuItem>
                    <MenuItem value="usury">Usury</MenuItem>
                    <MenuItem value="gamble">Gamble</MenuItem>
                    <MenuItem value="punking">Pledge("Punking")</MenuItem>
                    <MenuItem value="njangi">Contribution("Njangi")</MenuItem>
                    <MenuItem value="compensation">Compensation</MenuItem>
                    <MenuItem value="allowance">Allowance(child/spouce/parent/sibling...)</MenuItem>
                    <MenuItem value="recovery">Recovery(Loan/Debt)</MenuItem>
                    <MenuItem value="refund">Refund</MenuItem>
                    <MenuItem value="refund">Other/Miscellaneous</MenuItem>        
            </Select>
        </>
    )
}
