# Data Engineer Test Task
## Objectives
* Demonstrate problem solving and programming skills.
* Show data pipeline/storage/querying scalability understanding - create scalable
pipeline. 
* Understanding of performance/cost optimization - use existing tools’ features
(partitioning, caching etc) to optimize cost while fulfilling performance requirements.

We have messages in a stream representing vehicle telematics data.
200.000 messages per day, 20GB per day.

Messages are in json format:
```json
{
"vehicle_id": "XXXX",
"timestamp":"2021-04-30T10:00:00.000Z"
"location": {lat: 23.4234, lng:32.4242 }
"status": {...}
}
```
"status" field schema is not defined upfront (schema on read) and can change.
There're on average 1000 vehicles sending data on a single day. Some send a single
message, some sending up to 500 per day.

Also we have messages describing vehicle:
```json
{
"vehicle_id": "XXXX",
"description": {...}
}
```
"description" field schema is not defined upfront (schema on read) and can change.

At the moment we already have 1 year worth of data in the log.

We need to ingest them into some storage (files, DB etc) that we can query
afterwards. The data should be available for query after 2 hours.

## Most queries are:
* Selecting all the telematics data for a specific vehicle.
* Selecting all the telematics data for specific time range.
* Selecting all the telematics for a specific vehicle and time range.
* All of the above together with "vehicle description".

The queries are made by analysts on average 200 times/day. The queries should give
an answer in 2 minutes. 

We want to use Google Cloud managed services as much as possible.

Given the above requirements are met we want to optimize for cost.

## Your task is split into two – analysis and programming

### 1. Analysis 
Given the above situation description, choose the
storage/tools/services among google cloud offering you’d like to use and
describe:
1. What the ingestion pipeline would look like.
2. How you perform queries listed above (that ensures given performance
criteria is met).
3. Do cost analysis (cost per month) of the proposed solution (storage and
querying, when scaled to the amount of data we have).

### 2. Programming
1. Create a mock data producer in TypeScript that will stream
random messages as described in schemas above to a configurable HTTP
endpoint. 
2. Make the producer production ready - meaning the endpoint might
be unresponsive or unreachable for short periods of time.