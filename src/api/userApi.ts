import http from '../utils/http.js'

function SendUserInput (data:any){
    return http.post("/user/querys", data);
};

export default {
    SendUserInput
}