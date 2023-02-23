import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "admin",
    entities: ["./build/src/entity/*.js"],
    logging: true,
    // synchronize: true, //数据库的结构是否和代码保持同步，建议不要开启
})

// 创建 typeorm 连接
appDataSource
.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})