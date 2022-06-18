export enum EMAIL_ADDRESS_TYPE {
  FULL_NAME = 'fullName',
  SHORT_NAME = 'shortName'
}

export interface IEmailAddress {
  fullName: string;
  url: string;
  addressType: EMAIL_ADDRESS_TYPE;
}
