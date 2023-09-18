import { APIClient } from './APIClient'
import { generateFakeVehicleData, generateFakeVehicleTelematicData, getRandomDescription, getRandomStatus} from './JSONDataGenerator'
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const CONFIG_FILE_PATH = '../config/api-config.yml'
const NUM_JSON_FILES_TO_SEND = 5

/**
 * Reads a YAML configuration file and returns its contents as an object.
 * 
 * @param config_filepath The file path of the YAML configuration file.
 * @returns The parsed YAML configuration as a JavaScript object.
 * @throws If an exception occurs while reading the config file.
 */
function getConfig(config_filepath: string): any {
    try {
        const config = yaml.load(fs.readFileSync(config_filepath, 'utf8'));
        console.log(config);
        return config;
    } catch (error) {
        console.error(`Exception has been raised reading config file ${error}`);
        throw error;
    }
}

/**
 * Sends a JSON POST request to an API endpoint using an instance of the APIClient class.
 * Handles any errors that occur during the request and logs the response or error status.
 * 
 * @param JSONData - The JSON data to be sent in the POST request.
 * @param APIConfig - The configuration object for the API client.
 * @throws {Error} - If an exception occurs while sending the JSON message.
 * @returns {void}
 */
function sendJSONMessages(JSONData: any, APIClientInstance: APIClient): void {
    try {        
        const response = APIClientInstance.sendJsonRequest(JSONData);
        response.then((response) => {
            console.log(`API Response for vehicle_id ${JSONData['vehicle_id']} : ${response.status}`);
        })
        .catch((error) => {
            console.error(`API Error for vehicle_id ${JSONData['vehicle_id']} : ${error}`);
        });

    } catch(error){
        console.error(`Exception has been raised sending JSON message: ${error}`);
        throw error;
    }
}

function main(numJsonFiles: number): void {
  /**
   * Generates fake vehicle data and sends it to an configured endpoint API.
   * 
   * @param numJsonFiles - The number of sets of fake vehicle data to generate and send to the API.
   * @returns None.
   */
  const APIConfig: any = getConfig(CONFIG_FILE_PATH)
  const APIClientInstance = new APIClient(APIConfig);
  for (let num = 0; num < numJsonFiles; num++) {
    try{
        const vehicleJSON = generateFakeVehicleData(getRandomDescription());
        const vehicleTelemJSON = generateFakeVehicleTelematicData(vehicleJSON['vehicle_id'], getRandomStatus());
        sendJSONMessages(vehicleJSON, APIClientInstance)
        sendJSONMessages(vehicleTelemJSON, APIClientInstance)
    }catch(error) {
        console.error(`Exception has reaised execution main function. ${error}`);
        throw error;
    }
  }
}

/* Start the process execution */
main(NUM_JSON_FILES_TO_SEND)