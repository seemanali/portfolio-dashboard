import { Client, Databases } from "appwrite";
import config from "../config/config";









class DataBaseServiceForAboutSection {
    client = new Client();
    database;

    constructor (){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.Project_Id); 

        this.database = new Databases(this.client);
    }

    async UpdateDocument ( documentId , headline ,about_content){
        try {
            const response = await this.database.updateDocument(
                config.DATABASE_ID,
                config.ABOUT_SECTION_COLLECTION_TABLE,
                documentId,
                {
                    headline , about_content
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
               config.ABOUT_SECTION_COLLECTION_TABLE,
                "66d99e060011cc8fa215"
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }
};


const databaseserviceforabout = new DataBaseServiceForAboutSection();
export default databaseserviceforabout;