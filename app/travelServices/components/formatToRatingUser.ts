export const formatToRatingUser = (userString: string) => {
  return userString?userString
    .split(",")
    .map((user) => ({ ygdm: user.split("|")[0], ygmc: user.split("|")[1] })):[]
};
