import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
export default function Asynchronous({options, onChange, error, helperText}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
    size='small'
      id="asynchronous-demo"
      style={{ width: '100%' }}
      open={open}
      
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>  {
        // console.log('GET OPT SELECTED', option, value )
        return  option._id === value?._id
      }}
      getOptionLabel={(option) => option.lastName + ',' +option.firstName}
      onChange={onChange}
      options={options} 
      renderInput={(params) => (
        <TextField
          size='small'
          error={error}
          helperText={helperText}
          {...params} 
          variant="outlined"
           
        />
      )}
    />
  );
}