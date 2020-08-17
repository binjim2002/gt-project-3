import React, { Component, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Api from "../../utils/api";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

import DrinkSelector from "../../components/DrinkSelector";
import Drawer from "../../components/Drawer";
import Footer from "../../components/Footer";

let result = 0;
let drinkAbv = 0;
let ounces = 0;
let percent = 0;
let drink = 0;
let abvResults = 0;
let resultMessage= "";


const useStyles = makeStyles((theme) => ({
  //brian use this on all pages
  test: {
    marginTop: "75px",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      flexGrow: 1,
  
    },
  },
  button: {
    fontSize: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));



const EditPlan = (props) => {
  const [plan, setPlan] = React.useState({ drinks: [] });
  const [timeSlot, setTimeSlot] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(true);
  useEffect(() => {
    getPlan();

    console.log(props);
  }, []);
  const classes = useStyles();
  const [abv, setAbv] = React.useState(0);
  const [bac, setBac] = React.useState(0);
  // const [bac, setBac] = React.useState('');
  // const [ounces, setOunces] = React.useState('');
  // const [weight, setWeight] = React.useState('');
  // const [hours, setHours] = React.useState('');



  const handleBac = (event) => {
    handleAbv()
    //3 number result
    setBac(result.toFixed(3));
    console.log(bac);
  };
//,handleAbv(drink.alcoholPercentage) need to do this somewhere
  const handleAbv = (event) => {
     abvResults = 0;
    console.log("Array of drinks: ",plan.drinks.length);
    
    for(let i = 0;i<plan.drinks.length;i++){

    abvResults +=  plan.drinks[i].alcoholPercentage * plan.drinks[i].size * .075;
    console.log(abvResults);
    }
    // drinkAbv = percentage;
    // console.log("percentage: ", percentage);
    // setAbv(percentage);
  }

  const getPlan = () => {
    Api.get("/plans/" + props.match.params.planId).then((data) => {
      setPlan(data.data);
    });
  };
  const deleteDrink = (drinkId) => {
    Api.delete(`/plans/${plan._id}/drink/${drinkId}`).then(getPlan);
    handleAbv();
  };

  const handleTime = (event) => {
    console.log(event.target.value);

    setTimeSlot(event.target.value);
  };
  const handleWeight = (event) => {
    console.log(event.target.value);

    setWeight(event.target.value);
  };

  const calculateABV = () => {

  }

  const calculateBAC = () => {
    handleBac();
    //add all fluids
    let ounces = 32;
    
    //add all % then divide by # of drinks
    let percent = abv;
    let hours = timeSlot;
    //r = .55 female .68 male
    //Every time a drink is added, multiply ounces and the bac *.075
    //GAC = total alcohol consumed in grams (total vol of all drinks)^^^ *
    // result = (GAC/(Body Weight grams x r)) * 100
     result = abvResults / weight - hours * 0.015;
    if (result < 0) {
        resultMessage = "You are at the only safe driving limit and are not legally intoxicated.";
      console.log( "-- neglible amount --");
    } else {
      if (result == "NaN") resultMessage = "Please try again.";
      if (result > 0.08)
         resultMessage ="You would be considered legally intoxicated in all or most states and would be subject to criminal penalties.";
      if (result < 0.08) resultMessage = "Your driving ability is becoming impaired.";
    }
    //handleBac();
  };

  return (
    <div>
      <Drawer></Drawer>
      
      <div className={`${classes.root} ${classes.test}`}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Edit Plan Name"
            variant="outlined"
            defaultValue="loading..."
            value={plan.name}
            onChange={(ev) => setPlan({ ...plan, name: ev.target.value })}
          />
        </form>

        {plan.drinks.map((drink) => (


          <Grid container spacing={3}>
            <Grid item xs="3">
              <IconButton
                aria-label="delete"
                onClick={() => deleteDrink(drink._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs="9">
              <Paper className={classes.paper}>
                {drink.name} ({drink.alcoholPercentage}%)
              </Paper>
            </Grid>
          </Grid>
          
        ))}
        
        <Link to={"/addDrink/" + plan._id}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <Grid item xs={12}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="standard-number"
            label="Weight"
            type="number"
            onChange={handleWeight}
            value={weight}
            helperText="lbs"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="standard-number"
            label="Time frame"
            type="number"
            onChange={handleTime}
            value={timeSlot}
            helperText="hours"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Grid>
      <div>
        <Button onClick={calculateBAC}>Calculate</Button>
      </div>
      <div>
          <h2>{bac}</h2>
      </div>
      <div>
        <h3>{resultMessage}</h3>
      </div>
      <Footer></Footer>
    </div>
  
  );
};

export default EditPlan;
