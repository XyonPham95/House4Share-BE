## View online at: https://house4share.netlify.app/

![Landing Page](https://i.imgur.com/F36f49E.png)

## User Stories & Products Handle

* [x] Users can create new account with email, send vefication email for user after register
* [x] Users can login via Facebook, Google, Github.
* [x] Users can change their profile.
* [x] Users can see their post house, check houses.
* [x] Users can delete their houses.
* [x] Users can filter category apartment / houses.
* [x] Users can sort high price to low price and reverse.
* [x] Users can send comment to the owner of house.
* [x] Users can create new products with upload images of houses.
* [x] Users will encounter a "404 Not Found" page upon invalid URL.

## Time Spent

Time spent: ** above 1 week** spent in total.

## API EndPoints:

|        | User                                                      | Auth                                  | Category                                                     | ListProducts                             | Products            | Comment              |
|--------|-----------------------------------------------------------|---------------------------------------|--------------------------------------------------------------|------------------------------------------|---------------------|----------------------|
| GET    | createVerifyToken getUser                                 | facebook google github auth           | getCategory                                                  | chooseProduct  getProducts               | getSingleProduct    | getComment           |                 
| POST   | createUser                                                | login logout                          | createCategory                                               | createProducts                           | createDetailProduct | createComment        | 
| PUT    | updateProfile                                             |                                       |                                                              |                                          |                     |                      | 
| DELETE |                                                           |                                       | deleteCat                                                    | deleteProducts                           | deleteDetailProduct |                      | 


