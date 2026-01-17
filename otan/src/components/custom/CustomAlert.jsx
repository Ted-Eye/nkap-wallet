import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// export default function DescriptionAlerts() {
//     return (
//     <Stack sx={{ width: '100%' }} spacing={2}>
//         <Alert severity="info">
//             <AlertTitle>Info</AlertTitle>
//             This is an info Alert with an informative title.
//         </Alert>
//         <Alert severity="warning">
//             <AlertTitle>Warning</AlertTitle>
//             This is a warning Alert with a cautious title.
//         </Alert>
//         <Alert severity="error">
//             <AlertTitle>Error</AlertTitle>
//             This is an error Alert with a scary title.
//         </Alert>
//         </Stack>
//     );
// }


export function Success({ message, onClose }) {
    return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {message}
        </Alert>
    )
};

export function Error({ message, onClose }) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    )
};

export function Info({ message, onClose }) {
    return (
        <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {message}
        </Alert>
    )
};

export function Warning({ message, onClose }) {
    return (
        <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {message}
        </Alert>
    )
};