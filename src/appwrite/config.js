import conf from "../Conf/conf";
import { Client, Account, ID , Databases , Storage , Query } from "appwrite";

class DatabaseService{
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title,slug , content,image,status,userId}){
        try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            image,
            status,
            userId
        }
    )
    }catch(error){
            console.log("createPost :" , error)
        }
    }
    async updatePost(slug,{title , content,image,status}){
          try{
        return this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content, 
                image,
                status
            }
        )
          }catch(error){
            console.log("update :" , error);
          }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            console.log("delete" ,error)
            return false;
        }
       
    }
    async getPost(slug){
        try{
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
           

        }catch(error){
            console.log("getpost" ,error)
            return false;
        }
       
    }
    async getPosts(queries = [Query.equal("status","active")]){
       try {
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
          )
         
       } catch (error) {
         console.log("get all post :", error)
         return false;
       }
    }
     /// file upload services

     async uploadFile(file){
        try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )

            
        } catch (error) {
            console.log("uploadfile:",error) 
            return false;
        }
     }
     async deleteFile(fileId){
        try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )    
        } catch (error) {
            console.log("deletefile:",error) 
            return false;
        }
     }
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
     }
}
const Service = new DatabaseService()

export default Service