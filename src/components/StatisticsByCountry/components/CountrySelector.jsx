import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';
import React from 'react';

CountrySelector.propTypes = {};
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500]
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
}));
function CountrySelector(props) {
  const { selectedCountry = '', onCountryChange, countries = [] } = props;
  const classes = useStyles();

  // function countryToFlag(isoCode) {
  //   return typeof String.fromCodePoint !== 'undefined'
  //     ? isoCode
  //         .toUpperCase()
  //         .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
  //     : isoCode;
  // }

  return (
    // <Autocomplete
    //   id="country-select"
    //   style={{ width: 300 }}
    //   options={countries}
    //   classes={{
    //     option: classes.option,
    //   }}
    //   autoHighlight
    //   getOptionLabel={(option) => option.country}
    //   renderOption={(option) => (
    //     <React.Fragment>
    //       <span>
    //         <Avatar className={classes.square} src={option?.flag} />
    //       </span>
    //       {option?.country}
    //       {/* ({option.code}) +{option.phone} */}
    //     </React.Fragment>
    //   )}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       // value={selectedCountry}
    //       label="Choose a country"
    //       variant="outlined"
    //       inputProps={{
    //         ...params.inputProps,
    //         autoComplete: 'new-password', // disable autocomplete and autofill
    //       }}
    //       onChange={onCountryChange}
    //     />
    //   )}
    // />

    <div>
      <FormControl>
        <InputLabel htmlFor="country-selector" shrink>
          Country
        </InputLabel>
        <NativeSelect
          value={selectedCountry}
          onChange={onCountryChange}
          inputProps={{ name: 'country', id: 'country-selector' }}
          defaultValue="vn"
        >
          {countries.map(country => (
            <option key={country.iso2} value={country.iso2?.toLowerCase()}>
              {/* <Avatar variant="square" className={classes.square} src={country.flag} /> */}
              {country.country}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>Choose Country</FormHelperText>
      </FormControl>
    </div>
  );
}

export default CountrySelector;
