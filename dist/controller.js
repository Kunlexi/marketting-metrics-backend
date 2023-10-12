"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("./repository"));
const getMetrics = async (req, res, next) => {
    try {
        const campaignName = req.params.campaignName;
        if (!campaignName) {
            return res.status(400).json({
                message: "campaignName is required",
            });
        }
        const metrics = await repository_1.default.getMetric(campaignName);
        if (!metrics) {
            return res.status(404).json({
                message: `campaignName '${campaignName}' not found`,
            });
        }
        res.status(200).json({
            metrics
        });
    }
    catch (error) {
        next(error);
    }
};
const addMetrics = async (req, res, next) => {
    try {
        const { campaignName, impressions, clicks, conversions, spend } = req.body;
        const metrics = { campaignName, impressions, clicks, conversions, spend };
        const metricsExists = await repository_1.default.getMetric(campaignName);
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
        await repository_1.default.addMetrics(metrics);
        res.status(200).json({
            message: `Metrics added successfully for ${campaignName}`,
            metrics,
        });
    }
    catch (error) {
        next(error);
    }
};
const getMissingFieldsMessage = ({ campaignName, impressions, clicks, conversions, spend }) => {
    let message = "";
    !campaignName ? (message += "campaignName, ") : null;
    !impressions ? (message += "impressions, ") : null;
    !clicks ? (message += "clicks, ") : null;
    !conversions ? (message += "conversions, ") : null;
    !spend ? (message += "spend, ") : null;
    message += "are required";
    return message;
};
const getValidInputFieldsMessage = ({ campaignName, impressions, clicks, conversions, spend }) => {
    let message = "";
    typeof campaignName !== "string" ? (message += "campaignName is not a string, ") : null;
    parseInt(String(impressions)) != impressions ? (message += "impressions must be an integer number, ") : null;
    parseInt(String(clicks)) != clicks ? (message += "clicks must be an integer number, ") : null;
    parseInt(String(conversions)) != conversions ? (message += "conversions must be an integer number, ") : null;
    parseInt(String(spend)) != spend ? (message += "spend must be an integer number, ") : null;
    if (message !== "") {
        return message;
    }
    else {
        return null;
    }
};
exports.default = {
    getMetrics,
    addMetrics,
};
