import { Metric } from "./types";
import { writeFileSync, existsSync } from "fs";
import * as fs from "fs/promises";

class MetricsRepository {
   constructor() {
      const metrics = {};
      if (!existsSync("database.json")) {
         writeFileSync("database.json", JSON.stringify(metrics));
      }
   }
   public async getMetrics() {
      const metrics = JSON.parse(await fs.readFile("database.json", "utf8"));
      return metrics as Record<string, Metric>;
   }

   public async addMetrics(metric: Metric) {
      const metrics = await this.getMetrics();
      metrics[metric.campaignName] = metric;
      await fs.writeFile("database.json", JSON.stringify(metrics));
      return metric;
   }

   public async getMetric(campaignName: string) {
      const metrics = await this.getMetrics();
      console.log(metrics)
      return metrics[campaignName];
   }
}

export default new MetricsRepository();
