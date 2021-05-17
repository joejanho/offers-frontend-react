/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {OfferType, ArticleType} from '../types/offer';

type Inputs = {
  id?: number;
  offerType: OfferType,
  offerValue : number,
  title: string,
  activationDate: Date,
  selected?:boolean
  endDate: Date,
  articleTypes : ArticleType[]
};


export default function OfferFormComponent() {
  const [intialState] = useState<Inputs | undefined>();

  const wrapper = React.createRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // auto save values
    // setOfferValue();
    console.log('values useEffect', intialState);
  }, []);
  return (
    <div ref={wrapper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add new Offer
      </Button>
      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ad</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          Form here
        </DialogContent>
      </Dialog>
    </div>
  );
}
