import { Client, Account } from "appwrite";
import config from "../config/config";









class auth {
    client = new Client();
    account;

    constructor() {
        this.client.setProject(config.Project_Id);
        this.account = new Account(this.client);
    }

    async LoginAsAdmin(email, password) {
        try {
            let response = await this.account.createEmailPasswordSession(email, password);
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    async LogoutAsAdmin() {
        try {
            let response = await this.account.deleteSessions();
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

const authservice = new auth;
export default authservice;