import * as fs from 'fs';
import * as faker from 'faker';

interface Vehicle {
  vehicle_id: string;
  description: Record<string, any>;
}

interface VehicleTelematics {
  vehicle_id: string;
  timestamp: string;
  location: Record<string, number>;
  status: Record<string, any>;
}


/**
 * Generates fake vehicle data and saves it as a JSON file.
 * @param description - An object that contains the description of the vehicle.
 * @returns The parsed JSON data representing the generated fake vehicle data.
 */
export function generateFakeVehicleData(description: Record<string, string>): any {
  const vehicle_id = faker.datatype.uuid();
  const vehicleInt: Vehicle = {
    vehicle_id,
    description,
  };

  const jsonFilePath = `../json/Vehicle_${vehicle_id}.json`;
  const vehicleJSON = JSON.stringify(vehicleInt, null, 2)
  fs.writeFileSync(jsonFilePath, vehicleJSON);

  return JSON.parse(vehicleJSON)
}

/**
 * Generates fake vehicle telematic data and saves it as a JSON file.
 * 
 * @param vehicle_id - The ID of the vehicle for which the telematic data is being generated.
 * @param status - An object containing the status information of the vehicle.
 * @returns The parsed JSON data representing the generated vehicle telematic data.
 */
export function generateFakeVehicleTelematicData(vehicle_id: string, status: Record<string, string>): any {
  const now = new Date();
  const vehicleTelemInt: VehicleTelematics = {
    vehicle_id,
    timestamp: now.toISOString(),
    location: {
      long: Number(faker.address.longitude()),
      lat: Number(faker.address.latitude())
    },
    status
  };

  const jsonFilePath = `../json/VehicleTelematics_${vehicle_id}.json`;
  const vehicleTelemJSON = JSON.stringify(vehicleTelemInt, null, 2);
  fs.writeFileSync(jsonFilePath, vehicleTelemJSON);
  
  return JSON.parse(vehicleTelemJSON);
}

/**
 * Returns a random description from a list of descriptions.
 * Each description is an object with different properties generated using the `faker` library.
 * 
 * @returns {Record<string, any>} A random description object
 */
export function getRandomDescription(): Record<string, any>{
  let descriptionsList = [
    { driver_name: faker.name.findName(), vehicle_color: faker.vehicle.color(), vin: faker.vehicle.vin() },
    { driver_name: faker.name.findName(), license_plate: faker.vehicle.vrm(), brand: faker.vehicle.manufacturer() },
    { driver_name: faker.name.findName(), driver_phone: faker.phone.phoneNumber(), fuel_type: faker.vehicle.fuel() }
  ]

  return descriptionsList[Math.floor(Math.random() * descriptionsList.length)]
}

/**
 * Returns a random status from a list of predefined status objects.
 * 
 * @returns {Record<string, any>} A random status object.
 */
export function getRandomStatus(): Record<string, any>{
  let statusList = [
    { gps_status: 'CONNECTED', shipment_status: 'IN TRANSIT' },
    { antenna_4g_status: 'CONNECTED', reefer_temperature: `${Math.floor(Math.random() * 4)}°` },
    { shipment_status: 'DELIVERING', fuel_deposit_status: 'FULL' },
    { fuel_deposit_status: 'MEDIUM', mileage_in_km: Math.floor(Math.random() * 5000) }
  ]

  return statusList[Math.floor(Math.random() * statusList.length)]
}
