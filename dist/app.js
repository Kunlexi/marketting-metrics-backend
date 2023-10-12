"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const controller_1 = __importDefault(require("./controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post(constants_1.paths.metrics.postMetrics, controller_1.default.addMetrics);
app.get(constants_1.paths.metrics.getMetrics, controller_1.default.getMetrics);
app.get(constants_1.paths.home, (req, res) => {
    res.status(200).json({
        message: "ping!",
    });
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: constants_1.errors.internalServerError, url: req.url });
});
app.use((req, res) => {
    res.status(404).json({ message: constants_1.errors.pathNotFound, url: req.url, methode: req.method });
});
app.listen(constants_1.PORT, () => {
    console.log(constants_1.SERVER_RUNNING_MESSAGE);
});
