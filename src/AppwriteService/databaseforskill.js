import {Client , Databases} from "appwrite"
import config from "../config/config";

class DATABASEFORSKILLS {

    client = new Client();
    database;

    constructor (){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.Project_Id); 

        this.database = new Databases(this.client);
    }

    async UpdateDocument (skillName){
        try {
            const response = await this.database.updateDocument(
                config.DATABASE_ID,
                config.SKILLS_COLLECTION_TABLE,
                "66d9a93f002f1b605984",
                {
                    skillName
                }, 
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async LoadDocument(){
        try {
            const response = await this.database.getDocument(
               config.DATABASE_ID, 
               config.SKILLS_COLLECTION_TABLE,
                "66d9a93f002f1b605984"
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }
};

const databaseforskills = new DATABASEFORSKILLS();
export default databaseforskills;