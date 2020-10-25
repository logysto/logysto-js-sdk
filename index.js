'use-stric'
const { config, getPriceFromLocations, searchAddress } =require("./src/controllers/logysto-sdk");
exports.config = config;
exports.getPrice = getPriceFromLocations;
exports.searchAddress = searchAddress;