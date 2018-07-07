'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/dash','DashboardController.index')

Route.post('/uploadpar','DashboardController.dspdmp')

Route.get('/test','DashboardController.test')


Route.get('/justGA1','JustgaController.index')

Route.post('/justGA2','JustgaController.getInfo1')

//只有GA 的 PV
Route.post('/justGA_PV','JustgaController.justPV')