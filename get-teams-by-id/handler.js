'use strict';

const MongoClient = require ("mongodb");

const databaseUrl = "mongodb://localhost:27017;"


module.exports.hello = async event => {
  try {
    const {id} = event.pathParameters;
    const connection = await MongoClient.connect(databaseUrl);
    const database = connection.db("notesDB");
    const collection = database.collection("teams");
    const team = await collection.findOne({
      // id: id,
      _id: new MongoClient.ObjectId(id),
    });
    // const teams = await teamsCursor.toArray();
    // console.log(teams);
    connection.close();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: team,
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
