import {Typography} from '@mui/material'

export function Heading({text}) {
    return (
        <Typography 
            variant='h4'
            fontSize={34}
            fontStyle={'italic'}
            color='#d8eae8c1'
            borderBottom={'solid 1px white'}
            pb={2}
            textAlign={'center'}
            m={'12px 2px'}
            justifyContent={'center'}
            lineHeight={0.8}
            marginInlineStart={1}>
            {text}
        </Typography>
    )
}

export const SubHeading = ({text}) => {
    return <Typography
                alignItems={'center'}
                variant='caption'
                fontSize={26}
                letterSpacing={6}
                borderBottom={'solid black'}
                sx={{color: 'ActiveBorder'}}
                >
                {text}
            </Typography>
}

export const SubHeading2 = ({text}) => {
    return <Typography 
                variant="body1" gutterBottom 
                sx={{padding:'6px 8px', color: '#fbaa13ff', textAlign: 'center', letterSpacing: 2, fontSize: 24}}
            >
                {text}
        </Typography>
}

export const BoldText = ({text}) => {
    return <Typography 
                variant="h6" gutterBottom 
                sx={{ color: '#786541ff', textAlign: 'center', }}
            >
                {text}
        </Typography>
}
export const Paragraph = ({text}) => {
    return <Typography variant='caption'>
                {text}
            </Typography>
}
