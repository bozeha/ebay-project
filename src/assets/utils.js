export const getYesterday = () => {
  const oneDayInMilisec = 86400000;
  const now = new Date();
  const yesterdayInMilisec = now.getTime() - oneDayInMilisec;
  const yesterday = new Date(yesterdayInMilisec);
  const yesterdayString = `${yesterday.getFullYear()}-${
    yesterday.getMonth() + 1
  }-${yesterday.getDate()}`;
  return yesterdayString;
};
export const getToday = () => {
  const now = new Date();
  const todayStyring = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;
  return todayStyring;
};
