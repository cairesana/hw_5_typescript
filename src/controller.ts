import {Get, JsonController, Post, HttpCode, BodyParam, NotFoundError, Put, Param, Body} from 'routing-controllers'
import Game from './entity';
import defaultBoard from './entity';
import { Validator } from 'class-validator';


const onlyThoseColors = ['red', 'blue', 'green', 'yellow', 'magenta']


@JsonController()
export default class GameController {

   // create a `GET /games` endpoint that returns all the games (with envelope!)
    @Get('/games')
    async allGames() {
      const games = await Game.find()   // .find() is used to get all rows
      return { games }
    }

    // Add an endpoint `POST /games` for which the only input is a name. 
    // created game should receive a random color out of these colors: red, blue, green, yellow, magenta.
    @Post('/games')
    @HttpCode(201) 
    createGame(@BodyParam("name") name: string
    ) {
      const newGame = new Game()
      const randomColor = onlyThoseColors[Math.floor(Math.random() * onlyThoseColors.length)]

      newGame.name = name
      newGame.color = randomColor
      newGame.board = defaultBoard

      return newGame.save()
    } 
    
    // Add an endpoint `PUT /games/:id` or `PATCH /games/:id` that allows to overwrite one or more 
    // fields of the game. E.g. calling `PUT /games` with JSON body `{ "name": "new name" }` should update the name, same for color and board (not for id). 
    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,  
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('This game doesn\'t exists') 

      const validator = new Validator();
      
      if(validator.isNotIn(update.color, onlyThoseColors)) throw new NotFoundError('Buuh! I don\'t like this color. Please, select only between red, blue, green, yellow or magenta')

      return Game.merge(game, update).save() 
      
    }

  }





 
      



