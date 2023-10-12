export interface Metric {
   campaignName: string;
   impressions: number;
   clicks: number;
   conversions: number;
   spend: number;
}

export interface PostMetricsInput extends Metric {}
