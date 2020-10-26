'uses-strict'
const axios = require("axios");
const constants = require("../config/constants");

var apiKey;
var email;
var type;
var environment;
var ENDPOINT = constants.LOGYSTO_END_POINT;

exports.config = async (apiKey, email, environment ="production", type = "user")=>{
    this.apiKey = apiKey;
    this.email = email;
    this.type = type;
    this.environment = environment;
    if(environment === "development"){
        ENDPOINT = constants.LOGYSTO_DEV_END_POINT;
    }
    return{
        success: true,
        message: "Configured"
    };
}


exports.searchAddress = async(address, city) =>{
    try {
        if(this.apiKey && this.email){
            var options = {
                headers: {"private-key": this.apiKey, "token": this.email, "type": this.type}
            };
            console.log("URL",  ENDPOINT + constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" +  encodeURIComponent(address));
            const response = await axios.get(ENDPOINT+ constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" +  encodeURIComponent(address), options);
            if(response){
                if(response.status == 200 || response.status == 201){
                    console.log("res >>>>", response.data.response);
                    let result = JSON.parse(JSON.stringify(response.data.response));
                    return{
                        success: true,
                        response: result
                    };
                }else{
                    return{
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    }
                }
            }else{
                return{
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                }
            }
        }else{
            return{
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        return{
            success: false,
            error: error.message,
            errorCode: 99
        };
    } 
}

exports.getPriceFromLocations = async(initLocation, endLocation) =>{
    try {
        if(this.apiKey && this.email){
            const options = {
                headers: {"private-key": this.apiKey, "token": this.email, "type": this.type}
            };
            const locationsRequest = [];
            locationsRequest.push(initLocation);
            locationsRequest.push(endLocation);

            const bodyRequest = {
                insurance_value: 0,
                is_roundtrip: false,
                locations: locationsRequest
            };
            console.log("URL", ENDPOINT + constants.LOGYSTO_GET_PRICE_PATH);
            const response = await axios.post(ENDPOINT + constants.LOGYSTO_GET_PRICE_PATH, bodyRequest, options);
            if(response){
                if(response.status == 200 || response.status == 201){
                    if(response.data.status){
                        return{
                            success: true,
                            response: JSON.parse(JSON.stringify(response.data.response))
                        };
                    }else{
                        return{
                            success: false,
                            error: response.data.message,
                            erroCode: response.status
                        };
                    }
                }else{
                    return{
                        success: false,
                        error: response.data,
                        erroCode: response.status
                    }
                }
            }else{
                return{
                    success: false,
                    error: "No server response",
                    erroCode: "99"
                }
            }
        }else{
            return{
                success: false,
                error: "Invalid credentials",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return{
            success: false,
            error: error.message,
            errorCode: 99
        }; 
    }
}

exports.createDelivery = async()=>{
    try {
        
    } catch (error) {
        return{
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
}


exports.getTraceabilityByCode = async(code) => {
    try {
        if(code){
            if(Number(code)){
                if(this.apiKey && this.email){
                    const options = {
                        headers: {"private-key": this.apiKey, "token": this.email, "type": this.type}
                    };
                    console.log("URL", ENDPOINT + constants.LOGYSTO_GET_TRACE_BY_CODE + code);
                    const response = await axios.get(ENDPOINT + constants.LOGYSTO_GET_TRACE_BY_CODE + code, options);

                    if(response){
                        if(response.data){
                            if(response.data.status){
                                return {
                                    success: true,
                                    response: JSON.parse(JSON.stringify(response.data.response))
                                };
                            }else{
                                return {
                                    success: false,
                                    error: response.data.message,
                                    errorCode: 99
                                };
                            }
                        }else{
                            return {
                                success: false,
                                error: "No data response",
                                errorCode: 99
                            };
                        }
                    }else{
                        return {
                            success: false,
                            error: "No server response",
                            errorCode: 99
                        };
                    }
                }else{
                    return{
                        success: false,
                        error: "Invalid credentials",
                        errorCode: 99
                    };
                }
            }else{
                return{
                    success: false,
                    error: "Invalid service code",
                    errorCode: 99
                };
            }
        }else{
            return{
                success: false,
                error: "No code sended",
                errorCode: 99
            };
        }
    } catch (error) {
        console.log(error);
        return{
            success: false,
            error: error.message,
            errorCode: 99
        };
    }
}
