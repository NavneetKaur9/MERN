import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ListingCard from "./ListingCard";
import { api } from './Constants';
import Dialog from '@material-ui/core/Dialog';
import Pagination from '@material-ui/lab/Pagination';
import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

type IListings = {
    images?: IImages;
}

type IImages = {
    picture_url?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            padding: 10
        },
        pagination: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: 20,
        },
        appBar: {
            top: 'auto',
            bottom: 0,
        },
        searchWrapper: {
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
        },
        button: {
            padding: 15,
            marginLeft: 1,
        },
    }),
);

const Content = () => {
    const styles = useStyles();
    const listingsLimit = 20;
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchByLocation, setSearchByLocation] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [paginationCount, setPaginationCount] = useState(10);
    const [locationsList, setLocationsList] = useState([]);
    let searchValue = '';
    const onclick = ((e: any) => {
        console.log("onclick", e)
    });

    const getListingsCard = (listingObj: any, index: number) => {
        return (
            <Grid item xs={12} sm={6} md={3} onClick={onclick} key={index}>
                <ListingCard {...listingObj} />
            </Grid>
        );
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(api + `api/listings?page=${page}&location=${searchByLocation}&searchByName=${searchByName}&listingsLimit=${listingsLimit}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                setPaginationCount(Math.round(data.length / listingsLimit));
                setListings(data.products);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, [page, searchByLocation, searchByName]);

    useEffect(() => {
        fetch(api + `api/listings/locations`, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                console.log("data", data);
                setLocationsList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const onChangeLocation = (event: React.ChangeEvent<unknown>, value: any, reason: string) => {
        setSearchByLocation(value);
    }

    const onSearch = (event: any) => {
        console.log("taget::", event.target);
        searchValue = event.target.value;
    }
    const onClick = () => {
        setSearchByName(searchValue);
    }
    return (
        <React.Fragment>
            {/* //make it a grid: searchwrapper */}
            <div className={styles.searchWrapper}>
                <Autocomplete
                    id="add-a-location"
                    options={locationsList}
                    getOptionLabel={(option) => option}
                    style={{ width: 600 }}
                    renderInput={(params) => <TextField {...params} label="Location" variant="outlined" placeholder="Add a location" />}
                    onChange={onChangeLocation}
                />
                <div>
                    <TextField id="outlined-basic" label="Search by Name" variant="outlined" style={{ width: 600 }} onChange={onSearch} />
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        startIcon={<SearchIcon />}
                        onClick={onClick}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <Grid container spacing={2}>
                {console.log("listings", listings)}
                <Dialog onClose={onclick} aria-labelledby="simple-dialog-title" open={isLoading} className={styles.loader}>
                    <CircularProgress size={80} />
                </Dialog>

                {listings.map((listingObj, index) => getListingsCard(listingObj, index))}
                <AppBar position="fixed" color="default" className={styles.appBar}>
                    <div className={styles.pagination}>
                        <Pagination count={paginationCount} color="primary" size="large" showFirstButton showLastButton onChange={handleChange} />
                    </div>
                </AppBar>
            </Grid>
        </React.Fragment>
    );
};

export default Content;
