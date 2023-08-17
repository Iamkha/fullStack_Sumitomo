import { DataType } from "../enums/filter";

export type ColDefsType = {
  colId: string;
  title: string;
  link?: boolean;
  redirect?: string;
  filter?: {
    type: DataType;
    operator: string;
    dropdown?: DropdownOptions[];
    minmax?: boolean;
  };
  type?: DataType;
  component?: any;
  componentProps?: any;
  filterComponent?: any;
  filterComponentProps?: any;
};

export type EtableConfigType = {
  title: string;
  keySearch?: string;
  endpoint?: string;
  colDefs: ColDefsType[];
};

type DropdownOptions = {
  value: string | number;
  label: string;
};
