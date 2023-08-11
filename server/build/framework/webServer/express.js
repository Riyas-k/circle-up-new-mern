"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const expressConfig = (app) => {
    const corsOptions = {
        origin: "*",
        exposedHeaders: [
            "Cross-Origin-Opener-Policy: same-origin",
            "Cross-Origin-Embedder-Policy: require-corp",
            "Cross-Origin-Resource-Policy : same-site",
        ],
    };
    //express middlewares
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.default = expressConfig;
