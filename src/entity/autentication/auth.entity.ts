import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm"
//import { User } from "./User"
export enum Role {
    Admin = 'admin',
    Supplier = 'supplier',
    Retailer = 'retailer'
}

@Entity({ name: 'auth' })
export class Auth extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number
    
    @Column()
    firstName: string   

    @Column()
    middleName: string

    @Column()
    lastName: string

    @Column()
    email: string    

    @Column()
    tradeLiscenceNumber: string

    @Column()
    tradeLiscence: string

    @Column()
    kebeleID: string

    @Column({
        default:"default.jpg"
    })
    profilePicture: string 

    @Column()
    role: Role

    @Column()
    phoneNumber: number

    @Column()
    password: string

    // @OneToOne(
    //     () => User,
    //     user => user.auth
    // )
    // user:User

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
    // notesSharedWithYou: Note[];

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
    // notesYouShared: Note[];

}
