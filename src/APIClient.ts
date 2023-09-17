import axios, { AxiosResponse, AxiosError } from 'axios';

/**
 * The `APIClient` class represents a client for making JSON POST requests to a specified endpoint using the Axios library.
 */
export class APIClient {
    config: any;

    /**
     * Creates an instance of the `APIClient` class.
     * @param config - The configuration object for the client.
     */
    constructor(config: any) {
        this.config = config;
    }

    /**
     * Sends a JSON POST request to the specified endpoint URL with the provided data.
     * @param data - The JSON data to be sent in the POST request.
     * @returns A promise that resolves to the Axios response object containing the response data from the API.
     * @throws If an error occurs during the request.
     */
    async sendJsonRequest(data: any): Promise<AxiosResponse> {
        try {
            const axiosRetry = require('axios-retry');
            axiosRetry(axios, {
                retries: this.config['api-config']['num_retries'],
                retryDelay: axiosRetry.exponentialDelay,
                retryCondition: (error: AxiosError) => {
                    // Retry only on network errors or 5xx server errors
                    console.log(`Retrying API POST request for vehicle_id: ${data['vehicle_id']}`);
                    return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
                },
            });

            const response: AxiosResponse = await axios.post(this.config['api-config']['endpoint_url'], data, {
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': this.config['api-config']['api_key'],
                },
            });
            return response;
        } catch (error) {
            console.error(`Error has been raised: ${error}`);
            throw error;
        }
    }
}

/**
 * Sends a GET request to the specified URL.
 * @param url - The URL to send the GET request to.
 * @returns A promise that resolves to the Axios response object containing the response data from the API.
 * @throws If an error occurs during the request.
 */
async function getRequest(url: string): Promise<AxiosResponse> {
    try {
        const response: AxiosResponse = await axios.get(url);
        return response;
    } catch (error) {
        throw error;
    }
}