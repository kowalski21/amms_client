export const getBmiStatus = (number) => {
  if (number < 18.5) {
    return "Underweight";
  }
  if (number >= 18.5 && number < 25) {
    return "Normal";
  }
  if (number >= 25 && number < 30) {
    return "Overweight";
  }
  if (number >= 30) {
    return "Obese";
  }
};
const between = (x, min, max) => {
  return x >= min && x <= max;
};
export const getBpStatus = (bp) => {
  let sys;
  let dys;
  sys = parseInt(bp.split("/")[0]);
  dys = parseInt(bp.split("/")[1]);

  if (sys < 130 && dys < 90) {
    return "Normal";
  }
  if (between(sys, 130, 139) && dys >= 90) {
    return "Elevated";
  }
  if (between(sys, 140, 129) && dys < 80) {
    return "High";
  }
  // else {
  //   return "High Blood Pressure";
  // }
};
