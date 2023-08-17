import { ButtonFormat, CheckBoxFormat } from "../table/cell-format";
import { USER_ENDPOINT } from "../utils/endpoint";
import { EtableConfigType } from "../utils/types/etable-config";

export const USER_TABLE_CONFIG: EtableConfigType = {
  title: "Users",
  endpoint: "/api/v1/user/listing",
  colDefs: [
    {
      colId: "firstname",
      title: "First Name",
    },
    {
      colId: "lastname",
      title: "Last Name",
    },
    {
      colId: "email",
      title: "Email",
    },
    {
      component: CheckBoxFormat,
      colId: "roles",
      title: "Is Admin",
      componentProps: {
        value: ["roles", "0"],
        compareValue: "admin",
      },
    },
    {
      component: CheckBoxFormat,
      colId: "active",
      title: "Is Active",
      componentProps: {
        value: "active",
        compareValue: true,
      },
    },
    {
      component: ButtonFormat,
      colId: "action",
      title: "Actions",
    },
  ],
};
