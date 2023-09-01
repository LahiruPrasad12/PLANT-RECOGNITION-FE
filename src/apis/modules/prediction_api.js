import api from "../axios";
const baseURL = 'http://127.0.0.1:5000'

export default {
    predictedData: () => api.get(`${baseURL}/plant_prediction/`),
    predictImage: payload => api.post(`${baseURL}/plant_prediction/plant`, payload),
    savePredictedData: payload => api.post(`${baseURL}/plant_prediction/save`, payload),
}
