export const VISUAL_ACUITY_DROPDOWN = [
  "6/6",
  "6/9",
  "6/12",
  "6/18",
  "6/24",
  "6/36",
  "6/60",
  "CF",
  "H.M",
  "PL",
  "NPL",
];

export const getVisualAcuityLabels = () => {
  let tmp = VISUAL_ACUITY_DROPDOWN.map((elem) => {
    return { label: elem, value: elem };
  });
  return tmp;
};
