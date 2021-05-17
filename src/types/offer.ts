/* eslint-disable no-unused-vars */
export interface Offer {
    id: number;
    offerType: OfferType,
    offerValue : number,
    title: string
    activationDate: Date,
    selected?:boolean
    endDate: Date,
    articleTypes : ArticleType[]
}

export type OfferForAd = Omit<Offer, 'articleTypes'>;
export interface OfferForAdd extends OfferForAd {
    articleTypes : [{
        title: ArticleType,
        selected?: boolean
    }]
}

export enum OfferType {
    PERCENTAGE = 'percentag',
    FREESHIPPING = 'freeshipping',
    FIXEDAMOUNT = 'fixedamount'
}


export enum ArticleType {
    CALENDARS = 'Calendars',
    PHOTOBOOKS = 'Photobooks',
    MUGS = 'Mugs'
}

