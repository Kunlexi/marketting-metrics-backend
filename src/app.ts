import express, { Express, NextFunction, Request, Response } from "express";
import { PORT, SERVER_RUNNING_MESSAGE, errors, paths } from "./constants";
import Metrics from "./controller";
import cors from "cors";

import { PostMetricsInput } from "./types";
const app = express();
app.use(express.json());
// app.use(cors());

const corsOrigin = {
  origin: "*",
  // origin: "https://6528755abf49562744e6d518--gilded-cajeta-482d2b.netlify.app",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.use(express.urlencoded({ extended: true }));

app.post(paths.metrics.postMetrics, Metrics.addMetrics);

app.get(paths.metrics.getMetrics, Metrics.getMetrics);

app.get(paths.home, (req: Request, res: Response) => {
  res.status(200).json({
    message: "ping!",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: errors.internalServerError, url: req.url });
});

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: errors.pathNotFound, url: req.url, methode: req.method });
});

app.listen(PORT, () => {
  console.log(SERVER_RUNNING_MESSAGE);
});
