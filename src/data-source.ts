import "reflect-metadata"
import { DataSource } from "typeorm"
import { Auth } from "./entity/autentication/auth.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "wholesale_platform",
    synchronize: true,
    logging: false,
    entities: [Auth],
    migrations: [],
    subscribers: [],
})
