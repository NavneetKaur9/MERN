import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
    images?: IImages;
}

type IImages = {
    picture_url: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        price: {
            fontWeight: "bold",
        }
    }),
);

const ListingCard = (props: any) => {
    const classes = useStyles();
    const { images: { picture_url },
        name,
        room_type,
        beds,
        property_type,
        bed_type,
        cancellation_policy,
        price,
        number_of_reviews,
        address: { street }
    } = props;

    return (
        <Card>
            <CardMedia style={{ height: "200px" }} image={picture_url} title={name} />
            <CardContent>

                <Typography variant="body2" color="textSecondary" noWrap={true}>
                    {room_type} • {property_type} • {beds} Beds ({bed_type})
                </Typography>
                <Typography variant="h5" color="primary" noWrap={true}>
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {street}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Cancellation policy : {cancellation_policy}
                </Typography>
                <Typography variant="body2" className={classes.price} >
                    $ {price.$numberDecimal} / night
                </Typography>
                <Typography variant="body2" >
                    {number_of_reviews} Reviews
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ListingCard;
