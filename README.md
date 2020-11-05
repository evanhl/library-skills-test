# Library Skills Test

## Getting Started
 - Clone this repo.
 - Run `npm install` in the repo directory.
 - Run `node app.js`

## Sample `curl` commands

### Create request

`curl -i -w "\n" -H "Content-Type: application/json" --request POST --data '{"email":"margaret.hamilton@gmail.com","title":"1984"}' http://localhost:3000/request`

### Get all requests

`curl -i -w "\n" http://localhost:3000/request`

### Get specific request

`curl -i -w "\n" http://localhost:3000/request/1`

Replace "1" with whichever ID you're requesting.

### Delete request

`curl -w "\n" --header "Content-Type: application/json" -i --request DELETE http://localhost:3000/request/5`

Replace "5" with whichever ID you intend to delete.

## Book List

See `config/properties.js` for valid book list, or for a quick check, try "1984" as a valid example and "1985" as an invalid one.

## Ways to expand and improve on this solution

With more time, I would have liked to do the following:
 - Write automated integration tests
 - Write unit tests
 - Separate concerns to uncouple the database transactions from the request handling
 - Pull the router, each endpoint, and each data access operation into its own separate file
 - Add pagination to the `GET /request` endpoint
 - Use a library for input validation and parsing instead of doing it manually
 - Fix non-atomicity of ID generation and deletion handling
