export const formatToRatingUser = (userString: string) => {
  const users = userString
    .split(",")
    .map((user) => ({ ygdm: user.split("|")[0], ygmc: user.split("|")[1] }));
  return users;
};
