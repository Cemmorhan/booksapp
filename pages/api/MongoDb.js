// Create an api in nextjs to connect to mongodb

// Import the mongodb library
import { MongoClient } from 'mongodb';

// Create a function to connect to mongodb
export async function connectToDatabase() {
    // Create a client to connect to mongodb
    const client = await MongoClient.connect('mongodb://localhost:27017/nextjs');

    // Return the database
    return client;
}

// Create a function to get the database
export async function getDatabase() {
    // Create a client to connect to mongodb
    const client = await MongoClient.connect('mongodb://localhost:27017/nextjs');

    // Return the database
    return client.db();
}

