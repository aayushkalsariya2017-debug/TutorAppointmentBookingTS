import fs from "fs";
import path from "path";

export const logMessage = (message: string): void => {
  const filePath = path.join(__dirname, "app.log");
  const logLine = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(filePath, logLine);
};
