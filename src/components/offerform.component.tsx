/* eslint-disable require-jsdoc */
import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from
  '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Select} from '@material-ui/core';
import {ArticleType, OfferType} from '../types/offer';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const articleTypes = [
  ArticleType.CALENDARS,
  ArticleType.MUGS,
  ArticleType.PHOTOBOOKS,
];


export default function OfferFormComponent() {
  const {formState: {errors}, control, watch, handleSubmit,
    setValue} = useForm({
    mode: 'onChange',
    defaultValues: {
      offerType: OfferType.FIXEDAMOUNT,
      articleTypes: [''],
      title: '',
      offerValue: 0,
    },
  });
  const classes = useStyles();
  const [selectedArticleTypesState, setSelkectedArticleTypes] =
  React.useState<string[]>([]);
  const [offerTypeState, setOfferTypeState] =
  React.useState<string>('');

  const handleChangeArticleType =
  (event: React.ChangeEvent<{ value: unknown }>) => {
    const selecedValue = event.target.value as string[];
    setValue('articleTypes', selecedValue);
    setSelkectedArticleTypes(selecedValue);
  };

  const handleChangeOfferType =
  (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue: string = event.target.value as string;
    setOfferTypeState(selectedValue);
    setValue('offerType', selectedValue as OfferType);
    if (selectedValue === OfferType.FREESHIPPING) {
      setValue('offerValue', 0);
    }
  };

  const wrapper = React.createRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);

  const onSubmit: SubmitHandler<any> = (data) => {
    data.offerValue = parseInt(data.offerValue);
    const apiUrlPostAdd= process.env.REACT_APP_API_URL + 'offer/create';
    console.log('data', data);
    axios.post(apiUrlPostAdd, data)
        .then((response) => {
          console.log('response', response);
          setOpen(false);
        });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('watch', watch());

  useEffect(() => {
    // auto save values
    // setOfferValue();
    console.log('values useEffect');
  }, []);
  return (
    <div ref={wrapper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add new Offer
      </Button>
      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}
            className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Offer type</InputLabel>
            <Controller
              name="offerType"
              control={control}
              rules={{required: true}}
              render={({field}) => <Select {...field}
                native
                value={offerTypeState}
                onChange={handleChangeOfferType}
              >
                <option value={OfferType.FIXEDAMOUNT}>Fixed Amount</option>
                <option value={OfferType.PERCENTAGE}>Percentage</option>
                <option value={OfferType.FREESHIPPING}>Free shipping</option>
              </Select>}
            />
            {errors.offerType && 'offer Type is required'}

            <InputLabel id="demo-mutiple-name-label">Article types</InputLabel>
            <Controller
              name="articleTypes"
              control={control}
              rules={{required: true}}
              render={({field}) => <Select {...field}
                multiple
                value={selectedArticleTypesState}
                onChange={handleChangeArticleType}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {articleTypes.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              }/>

            <Controller
              name="title"
              control={control}
              rules={{required: true}}
              render={({field}) => <TextField
                margin="dense"
                label="title"
                type="text"
                fullWidth
                {...field} />}
            />
            {errors.title && 'title is required'}

            <Controller
              name="offerValue"
              control={control}
              rules={{required: true}}
              render={({field}) => <TextField
                type="number"
                margin="dense"
                label="amount"
                fullWidth
                {...field} />}
            />
            {errors.title && 'title is required'}

            <TextField
              id="datetime-local"
              label="Activation Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="datetime-local"
              label="End Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <input type="submit" />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
