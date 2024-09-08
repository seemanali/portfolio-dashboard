import {Client , Databases, ID} from "appwrite"
import config from "../config/config";

class USERMESSAGES{
    client = new Client();
    databases;



    constructor (){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.Project_Id); 

        this.database = new Databases(this.client);
    }

    async LoadMessages(){
        try {
            const response = await this.database.listDocuments(
             config.DATABASE_ID,
             config.PEOPLE_MESSAGES_COLLECTION
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

};

const usermessages = new USERMESSAGES();
export default usermessages;