'use-stric'
const { config, getPriceFromLocations, searchAddress, getTraceabilityByCode } =require("./src/controllers/logysto-sdk");
exports.config = config;
exports.getPrice = getPriceFromLocations;
exports.searchAddress = searchAddress;
exports.getTraceabilityByCode = getTraceabilityByCode;