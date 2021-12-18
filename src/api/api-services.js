import axios from "axios";

async function ApiGetService() {
    let url = "https://api.first.org/data/v1/countries";

    try {
        const res = await axios.get(url);
        if (res.data.data) {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default ApiGetService;
