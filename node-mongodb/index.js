import { MongoClient } from 'mongodb'

import 'dotenv/config'
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()

    const database = client.db('sample_mflix')
    const movies = database.collection('movies')

    // a
    const queryA = { title: 'Back to the Future' }
    const movieA = await movies.find(queryA)
    // console.log(movieA)

    // b
    const queryB = { title: 'The Room' }
    const options = {
      sort: { "imdb.rating": -1 },
      projection: { _id: 0, title: 1, imdb: 1 }
    }
    const movieB = await movies.findOne(queryB, options)
    console.log(movieB)

  } finally {
    await client.close()
  }
}

run().catch(console.dir)
