export const isValidUrl = (url: string) => {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
};

export const clearUrl = (url: string): string => {
  if (!isValidUrl(url)) {
    return '';
  }

  const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
  const urlWithoutWww = urlWithoutProtocol.replace(/^www\./, '');
  const urlWithoutHashAndQuery = urlWithoutWww.split('?')[0];
  const domain = urlWithoutHashAndQuery.split('/')[0];

  return domain;
};

const isValidFullName = (fullName: string): boolean => {
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(fullName);
};

export const getFirstAndLastName = (fullName: string): string[] | null => {
  if (!isValidFullName(fullName)) {
    return null;
  }

  const cleanFullName = fullName.trim().replace(/\s+/g, ' ');

  // ? How sould we handle middle names
  const [firstName, ...rest] = cleanFullName.split(' ');
  const lastName = rest[rest.length - 1];

  if (!firstName || !lastName) {
    return null;
  }

  return [firstName, lastName];
};
