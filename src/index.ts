import app from './app'
import { AppDataSource } from './database/data-souce';

const PORT = 3000








AppDataSource.initialize().then(async()=>{
    console.log("Database connection success")
}).catch((err)=>{
    console.log(err)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });