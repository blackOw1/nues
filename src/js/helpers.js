import { TIMOUT_SEC } from "./config";

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`The request took too long to respond. Timeout after ${s} ${s > 1 ? 'seconds' : 'second'}`));
        }, s * 1000);
    });
};

export const AJAX = async function(url, host, key) {
    const fetchPromise = fetch(url, { method: 'GET', headers: { 'x-rapidapi-host': `${host}`, 'x-rapidapi-key': `${key}` } });

    try {
        const res = await Promise.race([fetchPromise, timeout(TIMOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw { message: data.message, status: res.status };

        return data;
    } catch(err) {
        throw err;
    }
};