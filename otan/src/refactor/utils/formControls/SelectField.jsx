import {InputLabel, MenuItem, FormControl, Select} from '@mui/material'

export default function SelectField({ label, value, onChange, options, name, control }) {
    
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                name={name}
                onChange={onChange}
                label={label}
                control={control}
                >
                    {options.map((opt, index)=>(<MenuItem key={index} value={opt}>{opt}</MenuItem>))}
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    )
}
