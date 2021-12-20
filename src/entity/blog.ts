import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
@Entity()
export class  Blog{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string ;

    @Column()
    description: string ;

    @Column()
    content: string ;

    @Column({default:0} )
    likes : number;
}