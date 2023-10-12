"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs = __importStar(require("fs/promises"));
class MetricsRepository {
    constructor() {
        const metrics = {};
        if (!(0, fs_1.existsSync)("database.json")) {
            (0, fs_1.writeFileSync)("database.json", JSON.stringify(metrics));
        }
    }
    async getMetrics() {
        const metrics = JSON.parse(await fs.readFile("database.json", "utf8"));
        return metrics;
    }
    async addMetrics(metric) {
        const metrics = await this.getMetrics();
        metrics[metric.campaignName] = metric;
        await fs.writeFile("database.json", JSON.stringify(metrics));
        return metric;
    }
    async getMetric(campaignName) {
        const metrics = await this.getMetrics();
        console.log(metrics);
        return metrics[campaignName];
    }
}
exports.default = new MetricsRepository();
