import api from "../axios";

export default {

    saveImage: payload => api.post(`https://api.imgbb.com/1/upload`, payload, {
        headers: {
            'content-type': 'application/json'
        }
    }),
}
