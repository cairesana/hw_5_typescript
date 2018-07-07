// Create a `games` table with model using TypeORM. A game should have an `id`, a `name`, 
// a `color` and `board` field. 
// Both the name and color fields are `text` fields, the board field is of type `json`

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text', {nullable:false})
  color: string

  @Column('json', {nullable:false})
  board: JSON
}
