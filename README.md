# (POS) Point of Sales App

### Firebase Frontend [kassamiz.web.app](https://kassamiz.web.app/) & [heroku-backend](https://sypos.herokuapp.com/api/products/getproducts)

## How to run this app
- In root & client directories >> `yarn` to install all the packages
- In root directory >> `yarn dev` to run both the client & the server

## With this app, You can:
1. Register as a new user but if the user exists, an error message is displayed
2. Login only if the name and the password exist/registered in the database
3. Login as Admin, see all the users data, delete users and log out
4. Not use routes to access pages before login b/c they're protected
5. (CRUD) Create/Read/Update/Delete products in the products page
6. Delete the products added to cart or see the total cost
7. Create an invoice in cart and see the details in the bills page
8. Print the invoice with order details in bills page
9. See the customer details in the customers page

## Tech-stack
### Frontend
- React.js
- React to print
- React Router
- Redux (thunk)
- Ant Design
- Typscript
- Firebase

### Backend
- Express.js
- Jsonwebtoken
- Concurrently
- Mongodb


   
   