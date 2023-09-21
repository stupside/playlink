"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const cors_1 = __importDefault(require("@fastify/cors"));
/**
 * This plugins adds cors policies ability
 *
 * @see https://github.com/fastify/fastify-cors
 */
const pl = (0, fastify_plugin_1.default)((fastify, _) => {
    fastify.register(cors_1.default);
});
exports.default = pl;
