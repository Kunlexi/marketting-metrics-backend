"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_RUNNING_MESSAGE = exports.paths = exports.errors = exports.PORT = void 0;
exports.PORT = 4000;
exports.errors = {
    pathNotFound: "Path Not Found",
    internalServerError: "Internal Server Error",
};
exports.paths = {
    home: "/",
    metrics: {
        postMetrics: "/metrics",
        getMetrics: "/metrics/:campaignName",
    },
};
exports.SERVER_RUNNING_MESSAGE = `Server is running on port ${exports.PORT}`;
