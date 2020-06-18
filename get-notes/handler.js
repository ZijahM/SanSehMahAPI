'use strict';

const MongoClient = require ("mongodb");

const databaseUrl = "mongodb://localhost:27017;"


module.exports.hello = async event => {
  try {
    const connection = await MongoClient.connect(databaseUrl);
    const database = connection.db("notesDB");
    const collection = database.collection("notes");
    const notesCursor = await collection.find({});
    const notes = await notesCursor.toArray();
    connection.close();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: notes,
        }
      ),
    };
  } catch (e) {
    return{
      statusCode: 500,
      body: {}
    };
  }
};
