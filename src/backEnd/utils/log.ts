import moment from "moment";
import fs from "fs-extra";

const path = "./logs";

export const createLog = (
  log: any,
  object: string,
  mainObject = "System",
  time = "daily",
  prefix?: string
) => {
  const week = moment().format("w");
  let logPath = `${path}/${mainObject}/${object}/week_${week}.log`;
  const timeLog = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  if (time === "daily") {
    logPath = `${path}/${mainObject}/${object}/week_${week}/${moment().format(
      "YYYY_MM_DD"
    )}.log`;
  }
  const stringifyLog = `${timeLog}: ${prefix || ""} ${
    typeof log === "string" ? log : JSON.stringify(log, null, 2)
  }\n`;
  if (fs.existsSync(logPath)) {
    fs.appendFile(logPath, stringifyLog);
  } else {
    fs.ensureFile(logPath, (err: any) => {
      if (!err) {
        fs.outputFile(logPath, stringifyLog, (err: any) => {
          if (err) console.log(err);
        });
      } else console.log(err);
    });
  }
};
