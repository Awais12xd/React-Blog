import conf from "../Conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount;
      // if (userAccount) {
      //   //call another method
      //   return this.login(email, password);
      // } else {
      //   return userAccount;
      // }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentStatus(){
    try{
      return await this.account.get();
    }catch(error){
      console.log("currentStatus :", error)
    }
    return null;
  }
  async logout(){
    try{
     await this.account.deleteSessions();
    }catch(error){
      console.log("logout :", error)
    }
    
  }
}

const authService = new AuthService();

export default authService;