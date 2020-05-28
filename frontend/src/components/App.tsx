import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from "@material-ui/core";
import Content from './Content';
import PageHeader from "./PageHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    mainContainer: {
      marginTop: 16,
      paddingBottom: 100,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageHeader />
      <CssBaseline />
      <Grid container direction="column" className={classes.mainContainer}>
        <Grid item container>
          <Grid item xs={1} sm={1} />
          <Grid item xs={10} sm={10}>
            <Content />
          </Grid>
          <Grid item xs={1} sm={1} />
        </Grid>
      </Grid>
    </div>
  );
}
