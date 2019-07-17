"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.ContactSchema = new Schema({
    firstName: String,
    lastName: String,
    mail: String,
    company: String,
    phone: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});
