import React, { ReactElement, useState, useEffect } from 'react';
import { get } from '../../utils/call';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Box, Typography, List, Link, Card, CardContent } from '@material-ui/core';
import { CardData } from '../../App';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../../colors';
import HeartRating from '../utils/HeartRating';
import { ReviewWithId, ApartmentWithId } from '../../../common/types/db-types';
import { getAverageRating } from '../../utils/average';

type Props = {
  readonly info: CardData[];
  readonly title: string;
};

type CardProps = {
  readonly buildingData: ApartmentWithId;
  readonly numReviews: number;
  readonly company?: string;
};

const useStyles = makeStyles({
  aptNameTxt: {
    fontWeight: 700,
  },
  card: {
    borderRadius: '10px',
    backgroundColor: colors.red6,
  },
  reviewNum: {
    fontWeight: 700,
    marginLeft: '10px',
  },
});

const PropertyCard = ({ buildingData, numReviews, company }: CardProps): ReactElement => {
  const { aptNameTxt, card, reviewNum } = useStyles();
  const { id, name, address } = buildingData;
  const [reviewData, setReviewData] = useState<ReviewWithId[]>([]);

  useEffect(() => {
    get<ReviewWithId[]>(`/review/aptId/${id}`, {
      callback: setReviewData,
    });
  }, [id]);

  return (
    <Card className={card}>
      <CardContent>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography className={aptNameTxt}>{name}</Typography>
          </Grid>
          <Grid container item justify="space-between">
            <Grid>
              <Typography variant="subtitle1">{address}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <HeartRating value={getAverageRating(reviewData)} precision={0.5} readOnly />
            <Typography className={reviewNum}>
              {numReviews + (numReviews !== 1 ? ' Reviews' : ' Review')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const PropertyInfo = ({ info, title }: Props): ReactElement => {
  return (
    <Box mt={2} mb={1}>
      <Typography variant="h6">{title}</Typography>
      <List dense component="ul">
        <Grid container spacing={0} direction="row">
          {info.length === 0 && <Typography variant="body1">No information available.</Typography>}
          <Grid container spacing={2}>
            {info &&
              info.map(({ buildingData, numReviews, company }, index) => {
                const { id } = buildingData;
                return (
                  <Grid item key={index} xs={12}>
                    <Link
                      {...{
                        to: `/apartment/${id}`,
                        style: { textDecoration: 'none' },
                        component: RouterLink,
                      }}
                    >
                      <PropertyCard
                        key={index}
                        numReviews={numReviews}
                        buildingData={buildingData}
                        company={company}
                      />
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </List>
    </Box>
  );
};

export default PropertyInfo;
