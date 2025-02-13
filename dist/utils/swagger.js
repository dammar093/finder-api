"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Finder API documents",
            version: package_json_1.version
        },
        coponents: {
            securitySchems: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*routes.ts", "./src/models/*.model.ts"]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app) {
    // swagger page
    app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // swagger json docs
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
;
exports.default = swaggerDocs;
