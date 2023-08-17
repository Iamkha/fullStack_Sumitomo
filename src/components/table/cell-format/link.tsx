// import { Link } from 'react-router-dom';

import { convertRowValue } from "@/components/utils/helper/table";
import Link from "next/link";

const LinkFormat = ({ cellConfig, row }: any) => {
  return (
    <Link
      href={
        `${
          cellConfig.redirect
            ? cellConfig.redirect
            : location.pathname.replace(/\/$/, "")
        }` +
        `/${
          row["reference_id"]
            ? row["reference_id"]
            : row._id || row.id || row[cellConfig.colId]
        }`
      }
      {...(cellConfig.redirect ? { target: "_blank" } : {})}
      className={"text-[#1976d2]"}
    >
      {convertRowValue(row[cellConfig.colId], cellConfig.type)}
    </Link>
  );
};

export default LinkFormat;
