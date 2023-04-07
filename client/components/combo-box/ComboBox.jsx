import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const ComboBox = (props) => {
    const { locale } = useRouter().locale;
    const [items, setItems] = useState([]);
    const [value, setValue] = useState();
    const language = locale;
    var localItemObject = () => {
        try {
            return JSON.parse(localStorage.getItem(props.localStorageTitle));
        } catch (e) {
            return e;
        }
    }

    const convert = () => {
        if (typeof props.items === 'object' && !Array.isArray(props.items)) {
            setItems(Object.entries(props.items).map((e) => ({ "label": e[1], "values": [...e] })));
        }
        else setItems(props.items);
    }
    useEffect(() => {
        convert()
    }, [language])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Autocomplete
                    disablePortal
                    clearOnEscape
                    isOptionEqualToValue={localItemObject}
                    defaultValue={localItemObject}
                    getOptionLabel={(option) => option.label}
                    options={items}
                    onChange={(e, value) => {
                        setValue(value);
                        props.handleChange(true);
                        props.setToLocalStorage && localStorage.setItem(props.localStorageTitle, JSON.stringify(value))
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={props.placeholder} />}
                />
            </ThemeProvider>
        </>
    );
}
export default ComboBox