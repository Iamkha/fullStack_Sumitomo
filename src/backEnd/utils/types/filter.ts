export type FilterType = {
  dataType: string;
  field: string;
  value: number | string | null | string[] | MinMaxType;
  operator: string;
};

type MinMaxType = {
  min: string | number;
  max: string | number;
};
