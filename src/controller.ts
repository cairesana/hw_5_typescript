// Setup a webserver using routing-controllers

import {Get, JsonController, Post, HttpCode, BodyParam, NotFoundError, Put, Param, Body} from 'routing-controllers'
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
    
    // Add an endpoint `PUT /games/:id` or `PATCH /games/:id` that allows to overwrite one or more 
    // fields of the game. E.g. calling `PUT /games` with JSON body `{ "name": "new name" }` should update the name, same for color and board (not for id). 
    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,    // find the game using the given id (from @Param)
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('This game doesn\'t exists') // if the game does not exist, throw an error

      return Game.merge(game, update).save() // merge: if the game exists, overwrite the properties that are updated
      //save: save the updated game. 
      //tested: http put :4000/games/1 name="again2" color="blue" -- first without color validation. 
    }

  }

// next: 5. When a **game is changed** using the endpoint you made in #4 and the color field is updated, 
// make sure (validate) that the color is one of these colors: red, blue, green, yellow, magenta

  // study example: 
  // In code, that becomes:
  
  // @Put('/pages/:id')
  // async updatePage(
  //   @Param('id') id: number,  // -- Find the Page using the given id (from @Param)
  //   @Body() update: Partial<Page>
  // ) {
  //   const page = await Page.findOneById(id)
  //   if (!page) throw new NotFoundError('Cannot find page') // -- If the Page does not exist, throw an error
  
  //   return Page.merge(page, update).save()
  //}    // (merge method = If the Page exists, overwrite the properties that are updated)
      // (save method = Save the updated Page)

  // The NotFoundError is part of the 'routing-controller' package and can be imported from there.  


    // SAVE AND MERGE ARE Both standard elements of TypeORM.


 
      



