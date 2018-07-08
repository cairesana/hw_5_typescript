// Setup a webserver using routing-controllers

import {Get, JsonController, Post, HttpCode, BodyParam} from 'routing-controllers'
import Game from './entity';
import defaultBoard from './entity';


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
    // The created game should receive a random color out of these colors: red, blue, green, yellow, magenta. So every new game that gets created is assigned a random color. 
    @Post('/games')
    @HttpCode(201) //201: The request has succeeded and a new resource has been created as a result of it
    createGame(@BodyParam("name") name: string
    ) {
      const newGame = new Game()
      const randomColor = onlyThoseColors[Math.floor(Math.random() * onlyThoseColors.length)]

      newGame.name = name
      newGame.color = randomColor
      newGame.board = defaultBoard

      return newGame.save()
    } //tested: http post :4000/games name=novo-teste

  }

 
      



