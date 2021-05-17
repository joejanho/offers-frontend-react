/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Ad} from '../types/ad';
import {Offer, OfferType} from '../types/offer';
import axios from 'axios';

type Inputs = {
  title: string;
  asset: string;
  link: string;
  offers:InputsOffer[];
};

type InputsOffer = {
  id: number;
  offerType: OfferType,
  offerValue : number,
  title: string
  activationDate: Date,
  selected:boolean
  endDate: Date,
  articleTypes: {
    title: string,
    selected: boolean,
  }[];
};

export default function AdFormComponent() {
  const [intialState, setOfferValue] = useState<Inputs | undefined>();
  const {formState: {errors}, control, register,
    watch, handleSubmit} = useForm<Inputs>({
      mode: 'onChange',
    });

  function loadInitialSate(offers:Offer[]) {
    // eslint-disable-next-line max-len
    const offersSelected: InputsOffer[] = offers.map((obj)=> ({...obj, 'selected': false})) as any;
    console.log('offersSelected', offersSelected);
    const articleTypes = [] as any;
    offersSelected.forEach((singleOffer) => {
      singleOffer.articleTypes.forEach((subElement) => {
        articleTypes.push({
          'title': subElement,
          'selected': false,
        });
      });
      singleOffer.articleTypes = articleTypes;
    });
    console.log('offersSelected v2', offersSelected);
    const emptySate = {
      title: '',
      asset: '',
      link: '',
      offers: offersSelected as any,
    };
    console.log('emptySate', emptySate);
    setOfferValue(emptySate);
  }

  const wrapper = React.createRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);
  const apiUrlPostAdd= process.env.REACT_APP_API_URL + 'ad/create';
  const apiUrlGetOffers= process.env.REACT_APP_API_URL + 'offers';

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('intialState', intialState);
    const dataToPost = intialState as any;
    data.offers = dataToPost.offers;
    console.log('data', data);
    axios.post(apiUrlPostAdd, normalizeDataForApi(data))
        .then((response) => {
          console.log('response', response);
          setOpen(false);
        });
  };

  function normalizeDataForApi(input:Inputs):Ad {
    const offerApiInput:Ad = {
      'asset': input.asset,
      'link': input.link,
      'title': input.title,
      'offers': [],
    };
    input.offers.forEach((singleOffer) => {
      console.log('singleOffer', singleOffer);
      if (singleOffer.selected === true) {
        const offerApi:Offer = {
          'id': singleOffer.id,
          'title': singleOffer.title,
          'offerType': singleOffer.offerType,
          'offerValue': singleOffer.offerValue,
          'activationDate': singleOffer.activationDate,
          'endDate': singleOffer.endDate,
          'articleTypes': [],
        };
        singleOffer.articleTypes.forEach((singleArticleType) => {
          console.log('singleArticleType', singleArticleType);
          if (singleArticleType.selected === true) {
            offerApi.articleTypes.push(singleArticleType.title as any);
          }
        });
        offerApiInput.offers.push(offerApi);
      }
    });
    console.log('offerApiInput', offerApiInput);
    return offerApiInput;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log('watch', watch());

  async function getData() {
    await axios(apiUrlGetOffers)
        .then((response) => {
          loadInitialSate(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
  }


  useEffect(() => {
    // auto save values
    console.log('values useEffect', intialState);
    getData();
  }, []);
  return (
    <div ref={wrapper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add new Ad
      </Button>
      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ad</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue={intialState?.title}
              rules={{required: true}}
              render={({field}) => <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                {...field} />}
            />
            {errors.title && 'Title is required'}

            <Controller
              name="asset"
              control={control}
              defaultValue={intialState?.asset}
              rules={{required: true}}
              render={({field}) => <TextField
                autoFocus
                margin="dense"
                label="Asset Path"
                type="text"
                fullWidth
                {...field} />}
            />
            {errors.asset && 'Asset Path is required'}

            <Controller
              name="link"
              control={control}
              defaultValue={intialState?.link}
              rules={{required: true}}
              render={({field}) => <TextField
                autoFocus
                margin="dense"
                label="Link"
                type="text"
                fullWidth
                {...field} />}
            />
            {errors.link && 'Link is required'}

            {intialState?.offers.map((item:any, index:number) => (
              <div style={{padding: '10px'}} key={index}>
                <input
                  type="hidden"
                  {...register(`offers.${index}.title` as const)}
                  name={`offers[${index}].title`}
                  defaultValue={item.title}
                />
                <span>{item.title}</span>
                {item.articleTypes.map((item2:any, index2:number) => (
                  <div style={{padding: '5px'}} key={index2}>
                    <input
                      type="hidden"
                      // eslint-disable-next-line max-len
                      {...register(`offers.${index}.articleTypes.${index2}.title` as const)}
                      // eslint-disable-next-line max-len
                      name={`offers.${index}.articleTypes[${index2}.title`}
                      defaultValue={item2.title}
                    />
                    <input type="checkbox"
                      // eslint-disable-next-line max-len
                      {...register(`offers.${index}.articleTypes.${index2}.selected` as const)}
                      // eslint-disable-next-line max-len
                      name={`offers[${index}.articleTypes[${index2}].selected]`}
                      onChange={((e)=>{
                        if (e.target.checked===true) {
                          // console.log('getvalue', getValues());
                          intialState.offers[index].selected = true;
                          // eslint-disable-next-line max-len
                          intialState.offers[index].articleTypes[index2].selected = true;
                          console.log('e.target.checked', intialState);
                          // setValue('offers.' + index + '.selected', true);
                          // setValue('example', 'test');
                        } else {
                          // eslint-disable-next-line max-len
                          intialState.offers[index].articleTypes[index2].selected = false;
                          // eslint-disable-next-line max-len
                          const categoryGroup = [intialState.offers[index]].filter((e) => e.articleTypes.filter((c:any) => c.selected === true)[0])[0];
                          // eslint-disable-next-line max-len
                          const category = categoryGroup ? categoryGroup.articleTypes.filter((c:any) => c.selected === true)[0] : null;
                          console.log('checkIfOofferSelected', category);
                          intialState.offers[index].selected = false;
                          console.log('e.target.checked', intialState);
                          // setValue('example', 'test');
                        }
                      })}
                    />
                    <span>{item2.title}</span>
                  </div>
                ))}
              </div>
            ))}
            <input type="submit" />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
