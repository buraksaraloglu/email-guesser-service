export enum EMAIL_ADDRESS_TYPE {
  FULL_NAME = 'fullName',
  SHORT_NAME = 'shortName'
}

export interface IEmailAddress {
  fullName: string;
  url: string;
  addressType: EMAIL_ADDRESS_TYPE;
}

// const getEmailAdressFromFullName = (fullName: string, addressType: EMAIL_ADDRESS_TYPE): string => {
//   const [firstName, lastName] = fullName.toLowerCase().split(' ');

//   switch (addressType) {
//     case EMAIL_ADDRESS_TYPE.FULL_NAME:
//       return firstName + lastName;
//     case EMAIL_ADDRESS_TYPE.SHORT_NAME:
//       return firstName[0] + lastName;
//     default:
//       return firstName + lastName;
//   }
// }
