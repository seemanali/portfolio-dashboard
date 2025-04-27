import { Client, Databases, Storage, ID } from "appwrite";
import config from "../config/config";

class UploadApp {
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

    async createApp({ title, tagline, problem, solution, features, techstack, livedemo, github, download, banner, featured, technology }) {
        try {
            const response = await this.databases.createDocument(
                config.DATABASE_ID,
                config.APP_PROJECT, // collectionId
                ID.unique(),
                {
                    title, tagline, problem, solution, features, techstack, livedemo, github, download, banner, featured, technology
                },

            );
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }






};



const uploadapp = new UploadApp();
export default uploadapp;