'uses-strict'
const axios = require("axios");
const constants = require("../config/constants");

var apiKey;
var email;
var type;
var client;

exports.config = async (apiKey, email, type = "user")=>{
    console.log("credentials", apiKey, email, type);
    this.apiKey = apiKey;
    this.email = email;
    this.type = type;
    return{
        success: true,
        message: "Configured"
    };
}

client = axios.create({
    baseURL: constants.LOGYSTO_END_POINT,
    timeout: 1000,
    headers: {"private-key": this.apiKey, "token": this.email, "type": this.type}
  });

exports.searchAddress = async(address, city) =>{
    try {
        if(this.apiKey && this.email){
            console.log("URL", constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" +  encodeURIComponent(address));
            const response = await client.get(constants.LOGYSTO_SEARCH_ADDRESS_PATH + encodeURIComponent(city) + "/" +  encodeURIComponent(address));
            if(response){
                if(response.status == 200 || response.status == 201){
                    return{
                        success: true,
                        response: JSON.parse(JSON.stringify(response.data.response))
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

}

exports.createDelivery = async()=>{}
