"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
require("dotenv").config();
var helpers_1 = require("./helpers");
var database_1 = require("./database");
var joi_1 = require("joi");
var app = (0, express_1.default)();
var port = 5000;
app.use(body_parser_1.default.json()); // Middleware to parse JSON bodies
app.use((0, cors_1.default)());
var schema = joi_1.default.object({
    created_at: joi_1.default.string().required(),
    document: joi_1.default.string().required(),
    products: joi_1.default.array().items(joi_1.default.object({
        description: joi_1.default.string().required(),
        image_url: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        price_without_discount: joi_1.default.number().allow(null),
    })),
    payment: joi_1.default.object({
        card_holder_name: joi_1.default.string().required(),
        card_number: joi_1.default.string().required(),
        card_valid_until: joi_1.default.string().required(),
        cvv: joi_1.default.string().required(),
    }),
    payment_plan: joi_1.default.object({
        total: joi_1.default.number().required(),
        shipping: joi_1.default.number().required(),
        discount: joi_1.default.number().required(),
        subtotal: joi_1.default.number().required(),
    }),
});
app.get("/api/customer/:document/cart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var document, cart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                document = req.params.document;
                return [4 /*yield*/, (0, database_1.getCartByUser)(document)];
            case 1:
                cart = _a.sent();
                res.json(cart);
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/customer/:document/checkout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, newOrderDate, document, canUserMakeNewPurchase;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schema.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                }
                newOrderDate = req.body.created_at;
                document = req.body.document;
                if ((0, helpers_1.purchaseDateIsIncorrect)(newOrderDate)) {
                    return [2 /*return*/, res.status(403).send({
                            message: "Data da compra não pode ser maior ou menor do que a data atual.",
                        })];
                }
                return [4 /*yield*/, (0, helpers_1.canMakeNewPurchase)(document, newOrderDate)];
            case 1:
                canUserMakeNewPurchase = _a.sent();
                if (canUserMakeNewPurchase) {
                    (0, database_1.addOrder)(req.body);
                    res.status(201).send({ message: "Compra realizada com sucesso." });
                }
                else {
                    res.status(403).send({
                        message: "Limite de compras excedido ou ocorreu algum erro ao registrar os dados. Tente novamente mais tarde ou entre em contato com a gente.",
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
