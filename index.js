'use-stric';
const {
    config,
    getPriceFromLocations,
    searchAddress,
    getTraceabilityByCode,
    checkUserEmail,
    checkAddressCoverage
} = require("./src/controllers/logysto-sdk");
exports.config = config;
exports.getPrice = getPriceFromLocations;
exports.searchAddress = searchAddress;
exports.getTraceabilityByCode = getTraceabilityByCode;
exports.checkUserEmail = checkUserEmail;
exports.checkAddressCoverage = checkAddressCoverage;