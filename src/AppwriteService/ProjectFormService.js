import { Client, Databases, Storage ,ID } from "appwrite";
import config from "../config/config";

class ProjectService {
    client = new Client();
    databases;
    storage;


    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
            .setProject(config.Project_Id);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async UploadImage(file){
        try {
            let response = await this.storage.createFile(
              config.STORAGE_FOR_PROJECT_SECTION,
                ID.unique(),
                file
            );
            return this.loadSingleImage(response.$id)
        } catch (error) {
            return {success : false , error : error.messages }
        }
    }

    
    async UploadProjectData(title , description ,technologies ,image1_BIG , image1_mob,project_link,github_link,ispublic){
        try {
            const response = await this.databases.createDocument(
                config.DATABASE_ID,
                config.PROJECT_COLLECTION_TABLE, // collectionId
                ID.unique(), 
                {
                    title , description ,technologies ,image1_BIG , image1_mob,project_link,github_link,ispublic
                }, 

            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async LoadAllProjects(){
        try {
            const response = await this.databases.listDocuments(
                config.DATABASE_ID, 
                config.PROJECT_COLLECTION_TABLE, 
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async loadSingleImage(imageId){
        try {
            const response = await this.storage.getFileView(
               config.STORAGE_FOR_PROJECT_SECTION, 
                imageId
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async LoadSingleDocumment(documentId) {
        try {
            const response = await this.databases.getDocument(
                config.DATABASE_ID,
                config.PROJECT_COLLECTION_TABLE,
                documentId, 
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async DeleteDocument(documentId){
        try {
            const response = await this.databases.deleteDocument(
                config.DATABASE_ID, 
                config.PROJECT_COLLECTION_TABLE,
                documentId
            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }

    async UpdateDocument(documentId ,  title , description ,technologies ,image1_BIG , image1_mob,project_link,github_link,ispublic
    ){
        try {
            const response = await this.databases.updateDocument(
                config.DATABASE_ID,
                config.PROJECT_COLLECTION_TABLE, // collectionId
                documentId, 
                {
                    title , description ,technologies ,image1_BIG , image1_mob,project_link,github_link,ispublic
                }, 

            );
            return {success : true , data:response}
        } catch (error) {
            return {success : false , error:error.message}
        }
    }
};



const projectservice = new ProjectService();
export default projectservice;