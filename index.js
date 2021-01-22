'use-stric';
const LogystoSdk = require("./src/controllers/logysto-sdk");
const logystoSdk = new LogystoSdk();

module.exports = {
    config : logystoSdk.config,
    getPrice : logystoSdk.getPriceFromLocations,
    searchAddress : logystoSdk.searchAddress,
    getTraceabilityByCode : logystoSdk.getTraceabilityByCode,
    checkUserEmail : logystoSdk.checkUserEmail,
    checkAddressCoverage : logystoSdk.checkAddressCoverage,
    sendNotificationOTP : logystoSdk.sendNotificationOTP,
    checkOtp: logystoSdk.checkOtp,
    createDelivery: logystoSdk.createDelivery,
};
