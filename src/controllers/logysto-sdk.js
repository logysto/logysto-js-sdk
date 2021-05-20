'uses-strict';
const axios = require("axios");
const constants = require("../config/constants");

let apiKey;
let email;
let type = "user";
let environment;
let ENDPOINT = constants.LOGYSTO_DEV_END_POINT;

function LogystoSdk() {
}

LogystoSdk.prototype.config = (apiKeyInput, emailInput, environmentInput="development", typeInput = "user") => {
    apiKey = apiKeyInput;
    email = emailInput;
    environment = environmentInput;
    if (environment === "development") {
        ENDPOINT = constants.LOGYSTO_DEV_END_POINT;
    }else {
        ENDPOINT = constants.LOGYSTO_END_POINT;
    }
    console.log(email, apiKey, environment, ENDPOINT);
    return {
        success: true,
        message: "Configured"
    };
};

LogystoSdk.prototype.checkAddressCoverage = async function(address, city){
    try {
        console.log("cred", apiKey, email);
        if (apiKey && email) {
            if (address && city) {
                var options = {
                    headers: { "private-key": apiKey, "token": email, "type": type }
                };

                const bodyRequest = {
                    address: address,
                    city: city
                };

                console.log("URL", ENDPOINT + constants.LOGYSTO_CHECK_ADDRESS_AVAILABILITY);
                const response = await axios.post(ENDPOINT + constants.LOGYSTO_CHECK_ADDRESS_AVAILABILITY, bodyRequest, options);
                if (response) {
                    if (response.status == 200 || response.status == 201) {
                        console.log("res >>>>", response.data.response);
                        let result = JSON.parse(JSON.stringify(response.data.response));
                        return {
                            success: true,
                            response: result
                        };
                    } else {
                        return {
                            success: false,
                            error: response.data,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: "No server response",
                        erroCode: "99"
                    };
                }

            } else {
                return { status: false, error: "Invalid params", errorCode: 99 };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};


LogystoSdk.prototype.sendNotificationOTP = async function(mobilephone, emailSend){
    try {
        console.log("cred", apiKey, email);
        if (apiKey && email) {
            if (mobilephone && emailSend) {
                var options = {
                    headers: { "private-key": apiKey, "token": email, "type": type }
                };

                const bodyRequest = {
                    mobilephone: mobilephone,
                    email: emailSend
                };

                console.log("URL", ENDPOINT + constants.LOGYSTO_SEND_OTP);
                const response = await axios.post(ENDPOINT + constants.LOGYSTO_SEND_OTP, bodyRequest, options);
                if (response) {
                    if (response.status == 200 || response.status == 201) {
                        console.log("res >>>>", response.data.response);
                        let result = JSON.parse(JSON.stringify(response.data));

                        if(result.status){
                            return {
                                success: true,
                                response: result.message,
                                user: result.user
                            };
                        }else{
                            return {
                                success: false,
                                response: result.error
                            };
                        }
                       
                    } else {
                        return {
                            success: false,
                            error: response.data,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: "No server response",
                        erroCode: "99"
                    };
                }

            } else {
                return { status: false, error: "Invalid params", errorCode: 99 };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.checkUserEmail = async (emailSend) => {
    try {
        console.log("cred", apiKey, email);
        if (apiKey && email) {
            if (emailSend) {
                var options = {
                    headers: { "private-key": apiKey, "token": email, "type": type }
                };

                const bodyRequest = {
                    email: emailSend
                };

                console.log("URL", ENDPOINT + constants.LOGYSTO_CHECK_USER_EMAIL, email);
                const response = await axios.post(ENDPOINT + constants.LOGYSTO_CHECK_USER_EMAIL, bodyRequest, options);
                if (response) {
                    if (response.status == 200 || response.status == 201) {
                        console.log("res >>>>", response.data);
                        let result = JSON.parse(JSON.stringify(response.data));
                        if(result.status){
                            return {
                                success: true,
                                response: result.message,
                                mobilephone: result.mobilephone
                            };
                        }else{
                            return {
                                success: false,
                                response: result.error
                            };
                        }
                        
                    } else {
                        return {
                            success: false,
                            error: response.data,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: "No server response",
                        erroCode: "99"
                    };
                }

            } else {
                return { status: false, error: "No user email sended", errorCode: 99 };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.searchAddress = async (address, city) => {
    try {
        console.log("cred", apiKey, email);
        if (apiKey && email) {
            var options = {
                headers: { "private-key": apiKey, "token": email, "type": type }
            };
            console.log("URL", ENDPOINT + constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" + encodeURIComponent(address));
            const response = await axios.get(ENDPOINT + constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" + encodeURIComponent(address), options);
            if (response) {
                if (response.status == 200 || response.status == 201) {
                    console.log("res >>>>", response.data.response);
                    let result = JSON.parse(JSON.stringify(response.data.response));

                    if(response.data.status){
                        return {
                            success: true,
                            response: result
                        };
                    }else{
                        return {
                            success: false,
                            error: response.data,
                            erroCode: response.status
                        };
                    }
                  
                } else {
                    return {
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    };
                }
            } else {
                return {
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.getPriceFromLocations = async (initLocation, endLocation) => {
    try {
        console.log("cred", apiKey, email);
        console.log("getPriceFromLocations");
        if (apiKey && email) {
            const options = {
                headers: { "private-key": apiKey, "token": email, "type": type }
            };
            const locationsRequest = [];
            const locationOne = [initLocation];
            const locationTwo= [endLocation];
            const firstRoute = [locationOne, locationTwo];
            locationsRequest.push(firstRoute);

            const bodyRequest = {
                insurance_value: 0,
                is_roundtrip: false,
                step_charging: false,
                user_type: "messaging",
                routes: JSON.stringify(locationsRequest)
            };
            console.debug(bodyRequest);
            console.log("URL", ENDPOINT + constants.LOGYSTO_GET_PRICE_PATH);
            const response = await axios.post(ENDPOINT + constants.LOGYSTO_GET_PRICE_PATH, bodyRequest, options);
            if (response) {
                if (response.status == 200 || response.status == 201) {
                    if (response.data.status) {
                        return {
                            success: true,
                            response: JSON.parse(JSON.stringify(response.data.response))
                        };
                    } else {
                        return {
                            success: false,
                            error: response.data.message,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    };
                }
            } else {
                return {
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.createDelivery = async (user_token, delivery, user) => {
    try {
        console.log("cred", apiKey, email);
        console.log("user_token ", user_token);

        console.log("delivery "+delivery.city);

        if (apiKey && email) {
            const options = {
                headers: { "private-key": apiKey, "token": email, "type": type }
            };

            /*const addresses = [];
            addresses.push(initLocation);
            addresses.push(endLocation);*/

            const bodyRequest = {
                user_token: user_token,
                delivery: delivery,
                user: user
            };

            console.log(bodyRequest);
            console.log("URL", ENDPOINT + constants.LOGYSTO_CREATE_DELIVERY);
            const response = await axios.post(ENDPOINT + constants.LOGYSTO_CREATE_DELIVERY, bodyRequest, options);
            if (response) {
                if (response.status == 200 || response.status == 201) {
                    if (response.data.status) {
                        return {
                            success: true,
                            response: JSON.parse(JSON.stringify(response.data.response))
                        };
                    } else {
                        return {
                            success: false,
                            error: response.data.message,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    };
                }
            } else {
                return {
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.checkOtp = async(otp, mobilephone, email = null) =>{
    try {
        console.log("cred", apiKey, email);
        if (otp && (mobilephone || email)) {
            const options = {
                headers: { "private-key": apiKey, "token": email, "type": type }
            };
            const bodyRequest = {
                mobilephone: mobilephone,
                otp: otp,
                email: email
            };
            console.log("URL", ENDPOINT + constants.LOGYSTO_CHECK_OTP);
            const response = await axios.post(ENDPOINT + constants.LOGYSTO_CHECK_OTP, bodyRequest, options);
            if (response) {
                if (response.status == 200 || response.status == 201) {
                    if (response.data.status) {
                        return {
                            success: true,
                            response: JSON.parse(JSON.stringify(response.data))
                        };
                    } else {
                        return {
                            success: false,
                            error: response.data.error,
                            erroCode: response.status
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    };
                }
            } else {
                return {
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                };
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};

LogystoSdk.prototype.getTraceabilityByCode = async (code, userEmail) => {
    try {
        console.log("cred", apiKey, email);
        if (code) {
            if (Number(code)) {
                if (apiKey && email) {
                    const options = {
                        headers: { "private-key": apiKey, "token": email, "type": type }
                    };
                    console.log("URL", ENDPOINT + constants.LOGYSTO_GET_TRACE_BY_CODE + code + "/" + userEmail);
                    const response = await axios.get(ENDPOINT + constants.LOGYSTO_GET_TRACE_BY_CODE + code + "/" + userEmail, options);

                    if (response) {
                        if (response.data) {
                            if (response.data.status) {
                                return {
                                    success: true,
                                    response: JSON.stringify(response.data.response)
                                };
                            } else {
                                return {
                                    success: false,
                                    error: response.data.message,
                                    errorCode: 99
                                };
                            }
                        } else {
                            return {
                                success: false,
                                error: "No data response",
                                errorCode: 99
                            };
                        }
                    } else {
                        return {
                            success: false,
                            error: "No server response",
                            errorCode: 99
                        };
                    }
                } else {
                    return {
                        success: false,
                        error: "Invalid credentials",
                        errorCode: 99
                    };
                }
            } else {
                return {
                    success: false,
                    error: "Invalid service code",
                    errorCode: 99
                };
            }
        } else {
            return {
                success: false,
                error: "No code sended",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
};


module.exports =  LogystoSdk;
