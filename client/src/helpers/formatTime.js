const formatTime = (timestamp) => {
  if (timestamp === new Date().getTime()) {
    return "الأن";
  }

  //Get the time passed in seconds
  const timePassed = +((new Date().getTime() - timestamp) / 1000).toFixed();

  //Seconds
  if (timePassed < 60) {
    return `منذ ${timePassed} ثانية`;
  }

  //Minutes
  if (timePassed / 60 < 60 && timePassed / 60 >= 1) {
    return `منذ ${Math.floor(timePassed / 60)} دقيقة`;
  }

  //Hours
  if (timePassed / 60 >= 60 && timePassed / 60 / 60 < 24) {
    return `منذ ${Math.floor(timePassed / 60 / 60)} ساعة ${
      timePassed % 60
    } دقيقة`;
  }

  //Days
  if (timePassed / 60 / 60 >= 24) {
    return `منذ ${Math.floor(timePassed / 60 / 60 / 24)} يوم`;
  }

  return "غير معروف";
};

export default formatTime;
