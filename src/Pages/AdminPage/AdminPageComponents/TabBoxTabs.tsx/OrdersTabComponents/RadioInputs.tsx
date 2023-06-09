import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function RadioInputs(setShowCompleted) {
  
  setShowCompleted = setShowCompleted.showCompleted
  
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={true}
        onChange={(e) => setShowCompleted(e.target.value)}
      >
        <FormControlLabel value={true}  control={<Radio color='success'/>} label="سفارش های تکمیل شده"  />
        <FormControlLabel value={false} control={<Radio />} label="سفارش های در انتظار تکمیل" />
      </RadioGroup>
    </FormControl>
  );
}