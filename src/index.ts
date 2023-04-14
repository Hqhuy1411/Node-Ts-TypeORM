import app from './app'
import { AppDataSource } from './database/data-source';
import swaggerDocs from './swagger'
const PORT = 3000

AppDataSource.initialize().then(async()=>{
    console.log("Database connection success")
}).catch((err)=>{
    console.log(err)
})
const serverApp =app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //swaggerDocs(app,PORT)
  });

  export default  serverApp; // for testing
