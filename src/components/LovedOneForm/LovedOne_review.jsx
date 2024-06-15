import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function LovedOne_Review() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const lovedOne = useSelector(state => state.lovedOne);

    useEffect(() => {
        dispatch({ type: 'FETCH_LOVEDONE_DETAILS' });
    }, [dispatch]);

    const confirmSubmission = () => {
        console.log('Submission confirmed for:', lovedOne.name);
        dispatch({ type: 'CONFIRM_SUBMISSION', payload: lovedOne });
    };

    return (
        <Box sx={{ padding: theme.spacing(2) }}>
            <Typography variant="h5" gutterBottom>Loved One's Profile Review</Typography>
            <Typography><strong>Name:</strong> {lovedOne.name}</Typography>
            <Typography><strong>Age:</strong> {lovedOne.age}</Typography>
            <Typography><strong>Main Medical Conditions:</strong> {lovedOne.mainMedicalConditions}</Typography>
            <Typography><strong>Address:</strong> {lovedOne.address}</Typography>
            <Button variant="contained" color="primary" onClick={confirmSubmission} sx={{ marginTop: theme.spacing(2) }}>
                Confirm Submission
            </Button>
        </Box>
    );
}