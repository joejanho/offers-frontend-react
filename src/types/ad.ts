import {OfferForAd, ArticleType, Offer} from './offer';

export interface Ad {
    id?: string;
    title: string;
    asset: string;
    link: string;
    offers: Offer[];
}

export interface SelecedOffer {
  offer: OfferForAd;
  adselectedArticleTypes: [ArticleType]
}
