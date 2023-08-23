import * as React from "react";

import Icons from "../icons";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import "./css.css";

const listItems: any = [
  {
    icon: "dashboard",
    label: "Invoices",
    url: "/invoices",
  },
  // {
  //   icon: 'dashboard',
  //   label: 'SESAMi Invoices',
  //   url: '/invoices-sesami',
  // },
  {
    icon: "people",
    label: "Users",
    url: "/users",
  },
  {
    icon: "company",
    label: "Companies",
    url: "/companies",
  },
  {
    icon: "log",
    label: "Logs",
    url: "/log",
  },
  {
    icon: "upload",
    label: "Upload Documents",
    url: "/upload",
  },
];

interface ItemProps {
  icon: string;
  url: string;
  label: string;
  pathname: any;
}
const Item = (props: ItemProps) => {
  const icon = React.useMemo(() => {
    return <Icons name={props.icon} />;
  }, []);

  return (
    <Link
      href={props.url}
      className={` cursor-pointer   flex px-5 py-2 hover:bg-slate-100 ${
        props.url === props.pathname.pathname ? "bg-[#d1d1d1]" : "bg-white"
      }`}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </Link>
  );
};

const ListItems = (pathname: any) => {
  const renderChild = (item: any) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <List component="nav" className="relative">
        {item.children ? (
          <>
            <div>
              <Link href={item.url}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icons name={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
              <div
                className="absolute top-5 right-2 cursor-pointer"
                onClick={handleClick}
              >
                {open ? (
                  <Icons name="expandLess" />
                ) : (
                  <Icons name="expandMore" />
                )}
              </div>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" className="flex" disablePadding>
                {item.children ? (
                  item.children.map((el: any) => renderChild({ ...el }))
                ) : (
                  <Link href={item.url}>
                    <div>
                      {item.url} {item.label}
                    </div>
                    <Item
                      pathname={pathname}
                      key={item.label + item.url}
                      icon={item.icon}
                      label={item.label}
                      url={item.url}
                    />
                  </Link>
                )}
              </List>
            </Collapse>
          </>
        ) : (
          <Item key={item.label + item.url} pathname={pathname} {...item} />
        )}
      </List>
    );
  };

  const listItemsRender = listItems.map((item: any) => {
    if (item?.children) {
      return renderChild({ ...item });
    }
    return <Item pathname={pathname} key={item.label + item.url} {...item} />;
  });
  return <List component="nav">{listItemsRender}</List>;
};

export default ListItems;
