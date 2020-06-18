'use strict';

const MongoClient = require ("mongodb");

const databaseUrl = "mongodb://localhost:27017;"


module.exports.hello = async event => {
  try {
    const connection = await MongoClient.connect(databaseUrl);
    const database = connection.db("notesDB");
    const collection = database.collection("notes");

    const newNote = JSON.parse(event.body);

    const insertResult = await collection.insert(newNote);
    console.log(insertResult);

    connection.close();
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: "Success"
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

// stari nacin radio, samo prvi return koristio za timove
// module.exports.hello = async event => {
//     return {
//       statusCode: 200,
//       body: JSON.stringify(
//         {
//           teams: [
//                   {
//                     id: '1',
//                     title: 'team1',
//                   },
//                   {
//                     id: '2',
//                     title: 'team2',
//                   },
//                 ],
//           input: event,
//         }
//       ),
//     };
//   }
// };
