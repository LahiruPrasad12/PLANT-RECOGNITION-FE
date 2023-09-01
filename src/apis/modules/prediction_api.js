import api from "../axios";
const baseURL = 'http://127.0.0.1:5000'

export default {
    predictImage: payload => api.post(`${baseURL}/plant_prediction/plant`,payload),
    savePredictedData: payload => api.post(`${baseURL}/plant_prediction/save`,payload),
}
