export const getBmiStatus = (number) => {
  if (number < 18.5) {
    return "Underweight";
  }
  if (number >= 18.5 && number < 25) {
    return "Normal";
  }
  if (number >= 25 && number < 30) {
    return "Normal";
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

  if (sys <= 120 && dys <= 80) {
    return "Normal";
  }
  if (between(sys, 120, 129) && dys < 80) {
    return "Elevated";
  }
  if (between(sys, 120, 129) && dys < 80) {
    return "Elevated";
  } else {
    return "High Blood Pressure";
  }
};
