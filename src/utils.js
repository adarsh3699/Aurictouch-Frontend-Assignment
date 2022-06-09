
const apiBaseUrl = "https://app.aurictouch.com/";

async function apiCall(endpoint, method, body) {
    const apiUrl =  apiBaseUrl + endpoint;
    try {
        let apiCallResp;
        if (method === "GET" || method === undefined) {
            apiCallResp = await fetch(apiUrl);
        } else {
            apiCallResp = await fetch(apiUrl, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        }
       
        const apiJsonResp = await apiCallResp.json();
        return apiJsonResp;
    } catch (error) {
        return { msg: "Something went wrong", statusCode: 500 };
    }
}

export { apiCall };