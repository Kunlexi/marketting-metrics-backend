export const PORT = 4000;

export const errors = {
  pathNotFound: "Path Not Found",
  internalServerError: "Internal Server Error",
};

export const paths = {
  home: "/",
  metrics: {
    postMetrics: "/metrics",
    getMetrics: "/metrics/:campaignName",
  },
};

export const SERVER_RUNNING_MESSAGE = `Server is running on port ${PORT}`;
