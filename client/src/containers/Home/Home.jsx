import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container"
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import Disclaimer from "../../components/Disclaimer";
import Footer from "../../components/Footer";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  divStyle: {
    padding: "25 px",
    marginleft: "25 px",
  }
}));

const Home = () => {
 
  const [abv, setAbv] = React.useState("");
  const classes = useStyles;
  // const [bac, setBac] = React.useState('');
  // const [ounces, setOunces] = React.useState('');
  // const [weight, setWeight] = React.useState('');
  // const [hours, setHours] = React.useState('');

  
  

  return (
    <>
    <Container>
      <h1 style={{marginLeft: 0}}>Thirsty?</h1>
      <Link to="/NewPlan">
        <Button style={{marginRight:0,
    marginLeft:0,
    marginTop:5,
    paddingTop:25,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:25,
    backgroundColor:'#E8EDDF',
    borderRadius:10,
    borderWidth: "5px",
    borderColor: "black"}}>Make New Plan</Button>
      </Link>
      <Link to="/listPlans">
        <Button style={{marginRight:25,
    marginLeft:25,
    marginTop:5,
    paddingTop:25,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:25,
    backgroundColor:'#E8EDDF',
    borderRadius:10,
    borderWidth: "5px",
    borderColor: "black"}}>View User's Plans</Button>
      </Link>
    </Container>
    {/* <h1>JIMMY & BRIAN APPROVE MY PULL REQUEST TO GET THIS COOL STUFF</h1>
    <DrinkSelector variant="outlined"/>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-number"
            label="Weight"
            type="number"
            helperText="pounds"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="standard-number"
            label="Height"
            type="number"
            helperText="inches"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="standard-number"
            label="Time frame"
            type="number"
            helperText="hours"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button className={classes.button} variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-basic"
          label="Name of drink"
          type="string"
          helperText="ex: Bud Light"
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={abv}
            onChange={handleChange}
          >
            <MenuItem value={5}>Beer</MenuItem>
            <MenuItem value={12}>Wine</MenuItem>
            <MenuItem value={40}>Liquor</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="standard-number"
          label="Volume"
          type="number"
          helperText="oz"
          //question multiple onChanges? in order to keep updating state onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
       <SubmitButton></SubmitButton>
      </form>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Footer></Footer> */}
      <div style={{marginTop:  "650px"}} className={classes.divStyle}>
        <h1 style={{textAlign: "center",
      display: "inherit"
      }}>Disclaimer:</h1>


        <Disclaimer></Disclaimer>
</div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
