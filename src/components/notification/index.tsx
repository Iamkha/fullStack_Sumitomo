import { uniq } from "lodash";

import { Box } from "@mui/material";

export interface IPropsNotification {
  title: string;
  messages?: string[];
}

const Notification = ({ title, messages = [] }: IPropsNotification) => {
  const messagesRender = uniq(messages).map((message) => {
    return <li key={message}>{message}</li>;
  });

  return (
    <Box className="max-w-[300px]">
      <span>{title}</span>
      <br />
      {messagesRender.length ? <ul>{messagesRender}</ul> : null}
    </Box>
  );
};

export default Notification;
