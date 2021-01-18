import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
/**
 * Autocomplete component for assigning existing authors.
 * @param options : the options to be chosen from.
 * @param onChange:  function to handle onChange event.
 * @param error : indicates there are input errors. 
 * @param helperText : helper / error text to be displayed. 
 * @return MUI's Autocomplete component customised for assigning existing authors.
 */
export default function AutocompleteComponent({ options, onChange, error, helperText }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Autocomplete
            size="small"
            id="asynchronous-demo"
            style={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => { 
                return option._id === value?._id;
            }}
            getOptionLabel={option => option.lastName + "," + option.firstName}
            onChange={onChange}
            options={options}
            renderInput={params => (
                <TextField
                    size="small"
                    error={error}
                    helperText={helperText}
                    {...params}
                    variant="outlined"
                />
            )}
        />
    );
}
