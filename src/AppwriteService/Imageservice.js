import { Client, Storage ,ID} from "appwrite";
import config from "../config/config";

class ImageService {
    client = new Client();
    storage;

    constructor(){
        this.client .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.Project_Id); 
        this.storage = new Storage(this.client)
    }

    async UploadImages (file){
        try {
            let response = await this.storage.createFile(
                config.STORAGE_FOR_ABOUT_SECTION,
                ID.unique(),
               file
            );

            return {success :true , data :response}
        } catch (error) {
            return {success :false , error :error.message}
        }
    }

    async ListFiles (){
        try {
            let response = await this.storage.listFiles(
                config.STORAGE_FOR_ABOUT_SECTION
            );
            return {success :true , data :response}
        } catch (error) {
            return {success :false , error :error.message}
        }
    }

    async GetImage (fileId){
        try {
            let response =  this.storage.getFileView(
                config.STORAGE_FOR_ABOUT_SECTION,
                fileId
            );
            return {success :true , data :response}
        } catch (error) {
            return {success :false , error :error.message}
        }
    }
    
}

const imageservice = new ImageService;
export default imageservice;