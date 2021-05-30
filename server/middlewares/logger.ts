import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  console.log(chalk.greenBright(`${req.method} ${req.originalUrl}`));

  const start = new Date().getTime();
  res.on("finish", () => {
    const elapsed = new Date().getTime() - start;
    console.log(
      chalk.greenBright(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`
      )
    );
  });

  next();
};

export default logger;
