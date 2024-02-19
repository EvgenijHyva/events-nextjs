import { MongoClient, ServerApiVersion } from 'mongodb';

const pass = process.env.MONGODB_PASSWORD
const username = process.env.MONGODB_USERNAME

const uri = `mongodb+srv://${username}:${pass}@eventscluster.wjws7na.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
})


export default client;