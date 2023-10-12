import { NextFunction, Request, Response } from "express";
import MetricsRepository from "./repository";
import { PostMetricsInput } from "./types";

const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const campaignName = req.params.campaignName;
      if (!campaignName) {
         return res.status(400).json({
            message: "campaignName is required",
         });
      }
      const metrics = await MetricsRepository.getMetric(campaignName);
      if (!metrics) {
         return res.status(404).json({
            message: `campaignName '${campaignName}' not found`,
         });
      }
      res.status(200).json({
        metrics
      });
   } catch (error) {
      next(error);
   }
};

const addMetrics = async (req: Request<null, null, PostMetricsInput>, res: Response, next: NextFunction) => {
   try {
      const { campaignName, impressions, clicks, conversions, spend } = req.body;
      const metrics = { campaignName, impressions, clicks, conversions, spend };
      const metricsExists = await MetricsRepository.getMetric(campaignName);
      if (metricsExists) {
         return res.status(400).json({
            message: `campaignName '${campaignName}' already added`,
         });
      }
      if (!campaignName || !impressions || !clicks || !conversions || !spend) {
         const message = getMissingFieldsMessage({ campaignName, impressions, clicks, conversions, spend });
         return res.status(400).json({
            message,
         });
      }
      const message = getValidInputFieldsMessage({ campaignName, impressions, clicks, conversions, spend });
      if (message !== null) {
         return res.status(400).json({
            message,
         });
      }
      await MetricsRepository.addMetrics(metrics);

      res.status(200).json({
         message: `Metrics added successfully for ${campaignName}`,
         metrics,
      });
   } catch (error) {
      next(error);
   }
};
const getMissingFieldsMessage = ({ campaignName, impressions, clicks, conversions, spend }: PostMetricsInput) => {
   let message = "";
   !campaignName ? (message += "campaignName, ") : null;
   !impressions ? (message += "impressions, ") : null;
   !clicks ? (message += "clicks, ") : null;
   !conversions ? (message += "conversions, ") : null;
   !spend ? (message += "spend, ") : null;
   message += "are required";
   return message;
};

const getValidInputFieldsMessage = ({ campaignName, impressions, clicks, conversions, spend }: PostMetricsInput) => {
   let message = "";
   typeof campaignName !== "string" ? (message += "campaignName is not a string, ") : null;
   parseInt(String(impressions)) != impressions ? (message += "impressions must be an integer number, ") : null;
   parseInt(String(clicks)) != clicks ? (message += "clicks must be an integer number, ") : null;
   parseInt(String(conversions)) != conversions ? (message += "conversions must be an integer number, ") : null;
   parseInt(String(spend)) != spend ? (message += "spend must be an integer number, ") : null;

   if (message !== "") {
      return message;
   } else {
      return null;
   }
};
export default {
   getMetrics,
   addMetrics,
};
