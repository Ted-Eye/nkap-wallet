
export default function IncomeSources({Select, MenuItem, type, motive, handleChange}) {

    return (
        <>

            <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={motive}
                    label={type === "Cash-out"? 'Motive': "Source"}
                    // color={type === "Cash-out"? 'warning': "success"}
                    onChange={handleChange}
                    >
                    <MenuItem value="Salary">Salary</MenuItem>
                    <MenuItem value="job">Job</MenuItem>
                    <MenuItem value="withdrawal">Withdrawal</MenuItem>
                    <MenuItem value="gifted">Gifted</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="loan">Loan</MenuItem>
                    <MenuItem value="arrears">Arrears</MenuItem>
                    <MenuItem value="usury">Usury</MenuItem>
                    <MenuItem value="gamble">Gamble</MenuItem>
                    <MenuItem value="punking">Pledge("Punking")</MenuItem>
                    <MenuItem value="njangi">Contribution("Njangi")</MenuItem>
                    <MenuItem value="compensation">Compensation</MenuItem>
                    <MenuItem value="allowance">Allowance</MenuItem>
                    <MenuItem value="recovery">Recovery(Loan/Debt)</MenuItem>
                    <MenuItem value="refund">Refund</MenuItem>
                    <MenuItem value="others">Other/Miscellaneous</MenuItem>        
            </Select>
        </>
    )
}

