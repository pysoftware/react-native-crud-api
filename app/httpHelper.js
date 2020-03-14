export class HttpHelper {
    static HEADERS = {
        'Content-Type': 'application/json',
    };

    static async get(url) {
        try {
            return await request(url);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async post(url, data = {}) {
        try {
            return await request(url, 'POST', data);
        } catch (error) {
            throw error;
        }
    }

    static async delete(url) {
        try {
            return await request(url, 'DELETE');
        } catch (e) {
            console.log(0);
            throw e;
        }
    }

    static async patch(url, data = {}) {
        try {
            return await request(url, 'PATCH', data);
        } catch (e) {
            console.log(0);
            throw e;
        }
    }

    static async put(url, data = {}) {
        try {
            return await request(url, 'PUT', data);
        } catch (e) {
            console.log(0);
            throw e;
        }
    }
}

async function request(url, method = 'GET', data = {}) {
    const config = {
        method,
        headers: HttpHelper.HEADERS,
    };
    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
        config.body = JSON.stringify(data);
    }
    const response = await fetch(url, config);
    return await response.json();
}
