/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Offer} from '../types/offer';
import axios from 'axios';
import OfferFormComponent from './offerform.component';

export default function OffersListComponent() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const [data, setData] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const classes = useStyles();
  const apiUrl= process.env.REACT_APP_API_URL + 'offers';

  async function getData() {
    await axios(apiUrl)
        .then((response) => {
          console.log(response);
          setData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  useEffect(() => {
    getData();
  }, []);

  return (

    <TableContainer component={Paper}>
      <div>{loading}</div>
      <div>{error}</div>
      <OfferFormComponent></OfferFormComponent>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Article Types</TableCell>
            <TableCell align="right">Activation Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.length>0 && data.map((item)=>
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.offerType}</TableCell>
                <TableCell align="right">{item.offerValue}</TableCell>
                <TableCell align="right">
                  {item.articleTypes?.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))
                  }
                </TableCell>
                <TableCell align="right">{item.activationDate}</TableCell>
                <TableCell align="right">{item.endDate}</TableCell>
              </TableRow>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
