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
import {Ad} from '../types/ad';
import axios from 'axios';
import AdFormComponent from './adform.component';

export default function AdsListComponent() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const [data, setData] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl= process.env.REACT_APP_API_URL + 'ads';

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
      <AdFormComponent></AdFormComponent>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">link</TableCell>
            <TableCell align="right">assetPath</TableCell>
            <TableCell align="right">offers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.length>0 && data.map((item)=>
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">{item.link}</TableCell>
                <TableCell align="right">{item.asset}</TableCell>
                <TableCell align="right">
                  {item.offers?.map((value, index) => (
                    <p key={index}>{value.title} {value.articleTypes}</p>
                  ))
                  }
                </TableCell>
              </TableRow>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
