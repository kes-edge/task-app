const { MongoClient, ObjectId } = require('mongodb');
 
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const id = new ObjectId();
console.log(id);
// Database Name
const dbName = 'task-app';
 
async function connect_to_database(dbclient, dbName) {
    try {
        await dbclient.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error(err);
    }
}

async function insert_individual_document(db, collectionName, document) {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        return result;
    } catch (err) {
        console.error(err);
    }
}

async function insert_multiple_documents(db, collectionName, documents) {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(documents);
        return result;
    } catch (err) {
        console.error(err);
    }

}

async function close_connection(client) {
    try {
        await client.close();
        console.log('Connection closed successfully');
    } catch (err) {
        console.error(err);
    }
}

async function find_document(db, collectionName, query) {
    try {
        const result = await db.collection(collectionName).findOne(query);
        console.log('Document found:', result);
        return result; // This will return the result to the caller
    } catch (err) {
        console.error("Error finding document:", err);
        throw err; // This will allow the error to propagate
    }
}

async function main() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);

        // Uncomment and adjust following lines according to your use case
        // await insert_individual_document(db, 'tasks_to_perform', {description: "Take the boy to cricket", Completed: true, location: "Headingley"});
        const document = await find_document(db, 'tasks_to_perform', {taskname: "Wash the car"});
        console.log(document);
        // await insert_multiple_documents(db, 'tasks_to_perform', [
        //     {taskname: "Wash the car", description: "Take the car to be valeted", location: "Niagara Falls"},
        //     {taskname: "Buy groceries", description: "Buy groceries for the week", location: "Toronto"},
        //     {taskname: "Clean the house", description: "Clean the house", location: "Barnsley"}
        // ]);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed.');
    }
}

main();