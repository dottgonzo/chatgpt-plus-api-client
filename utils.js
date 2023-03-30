"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelId = void 0;
const MODEL_ID_MAP = {
    Legacy: "text-davinci-002-render-paid",
    Default: "text-davinci-002-render-sha",
    "gpt-4": "gpt-4",
};
function getModelId(model) {
    const modelId = MODEL_ID_MAP[model];
    if (!modelId) {
        throw new Error(`Invalid model option: ${model}. Valid options are "Default" and "Legacy".`);
    }
    return modelId;
}
exports.getModelId = getModelId;
