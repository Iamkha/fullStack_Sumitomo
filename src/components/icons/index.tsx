import * as React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import SendIcon from "@mui/icons-material/Send";
import CircleIcon from "@mui/icons-material/Circle";
import ConstructionIcon from "@mui/icons-material/Construction";
import RightArrow from "./rightArrow";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PreviewIcon from "@mui/icons-material/Preview";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const icons: any = {
  dashboard: DashboardIcon,
  people: PeopleIcon,
  inbox: InboxIcon,
  expandLess: ExpandLess,
  expandMore: ExpandMore,
  star: StarBorder,
  send: SendIcon,
  circle: CircleIcon,
  rightArrow: RightArrow,
  log: ConstructionIcon,
  upload: FileUploadIcon,
  view: PreviewIcon,
  edit: EditIcon,
  check: CheckIcon,
  plus: AddCircleOutlineIcon,
  minus: RemoveCircleOutlineIcon,
  company: BusinessIcon,
  zoomOut: ZoomOutIcon,
  zoomIn: ZoomInIcon,
};
type IProps = {
  name: keyof typeof icons | string;
};
const Icons = ({ name }: IProps) => {
  const RenderIcon = icons[name];
  if (RenderIcon) {
    return <RenderIcon />;
  }
  return null;
};

export default Icons;
