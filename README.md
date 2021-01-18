# How To Run 
## On Local Device
1. Clone this project. 
2. Make sure you have the following installed in your local device: 
    - MongoDB 
    - NPM 
    - ExpressJS
    - NodeJS
    - ReactJS 
3. Open terminal and `cd` to the root of this project directory. 
4. Run `yarn` or `npm install`.
5. `cd` to `/client`.
6. Run `yarn` or `npm install`.
7. `cd` to the root of this project directory. 
8. Run `yarn run start-dev` or `npm run start-dev`. 

Please Note:
- This project was developed with yarn as the package manager, so using yarn is preferred. 
- Backend is hosted at http://localhost:5000/
- Frontend is hosted at http://localhost:3000/

# Project Stack
- Backend: ExpressJS and NodeJS.
- Database : MongoDB with Mongoose. 
- Frontend : ReactJS with React-Bootstrap and Material UI. 
### Changing target Database URL and Backend Target Port :
- For Database URL:

# Project Structure
All backend-related files are in `/server`, while all frontend related files are in `/client`. 
## Backend
Using MVC Architecture (with ReactJS handling all its views), 
- Models are in `/models`.
    - DB Connection is established in [db.js](server/models/db.js). 
- Controllers are in `/controllers`.
- API routing are in `/routes`.
- Please ignore the `/views` and `/public` directory.
## Frontend
All components are in `/src`. 
- `/Books` - has all the components for showing book details and homepage. 
- `/Authors` - has all the components for showing author details and homepage. 
- `/Templates` - is responsible for the general layout of homepage, modal, flippable card, and card. 
- `Components` - contains all the reusable components, e.g. 404 - Page Not Found Alerts. 
- `App.jsx` - entry point of the web-app, which is also responsible for configuring MUI's dark theme palette and routing.

# Backend 
## Endpoints

* **GET /books/** - Returns a list of books in the database in JSON format
* **GET /book/{{id}}/** - Returns a detail view of the specified book id. Nest author details in JSON format
* **GET /authors/** - Returns a list of authors in the database in JSON format
* **GET /author/{{id}}/** - Returns a detail view of the specified author id
* **POST /author/** - Creates a new author with the specified details - Expects a JSON body
* **POST /book/** - Creates a new book with the specified details - Expects a JSON body
(As dictated from the challenge.)
## Database Structure
```
class Author(Model):
    firstName = models.TextField()
    lastName = models.TextField()
```

```
class Book(Model):
    name = models.TextField()
    isbn = models.TextField()
    author = models.ForeignKey(Author)
```
(As dictated from the challenge.)
Please note:
- It is assumed that all fields are required.
- In this project, all variables, functions, etc. use camelCase convention. 
# Frontend Routing 
Follows similar patterns to backend's endpoints : 
- `/authors` and `/books` for showing all authors and books respectively
- `/author/{{id}}/` and `/book/{{id}}/` to show individual author and book respectively (with popup window)
- `/books` is used as entry point of the web-app. So, `/` redirects to `/books`.
- All other routes will be responded with `404 - Page Not Found`. 

# Design Rationale
Both Book and Author sections have: 
- A search bar - for filtering.
- Total count.
- A grid with card layout.
- Add button.
- A modal.  
## Book
This section is used for: 
- Showing all books that exist in the database. 
- Adding a new book.
There are 2 use cases that could fit for this section: 
- A client / customer viewing a library / digital bookstore - which requires a more appealing homepage.
- An informative list of all the books available in the warehouse for admins. 

To respond to these 2 use cases, there are 2 kinds of Cards used to display each individual book: 
- A flippable card with an (stock) image - which is more interactive and appealing to client / customer. A carousel has also been added showing: Best Seller, New Releases and Most Popular books to make the homepage more appealing to client/customer to view.  
- A card with a link to modal / pop up window (with no images) - which is more informative, but less appealing to client / customer. However, this is more suitable for the admins in the warehouses use case. 
 

## Author
This section is used for: 
- Showing all authors that exist in the database. 
- Adding a new author. 

# Modal / Pop Up Window, Form Design and Validations
- Upon clicking an add button, a modal / pop up window shows. (Please note that the term "pop up window" and "modal" are used interchangeably in this project.)
- A form is shown using a modal. 
- All fields are required. A simple validation has been applied to check this. 
- After submitting a form, there will be an alert showing whether the form has been successfully submitted or not. The modal is not automatically closed so that user doesn't has to reopen the modal again when they want to add multiple authors / books. 
## Book
Since a Book requires an Author, so, there are 2 sections in a Book's modal: 
- Book : Name, ISBN
- Author : First Name, Last Name.
Upon adding a book, user can assign an existing author to this book, or add a new author too. 
## Author
Author's form contains First Name and Last Name. 
## Validation
For simplicity, form is validated only after hitting 'Add' button. 
# Github Branches
To avoid confusions with other candidates' responses, each branch I have worked onis prefixed with 'gilbert-'. 
# Possible Improvements / Extensions
- use of [redux](https://redux.js.org/) / [xstate](https://xstate.js.org/)
    - Necessary when the scale of the app grows significantly bigger. 
    - This will avoid the need to pass down loading/success/error states too.
    - we can see repeating patterns of handling loading and error states in `/Templates` and `useEffect()`, which could possibly be refactored with this.  
- when dealing with large amount of data,
    - virtualisations would be required 
    - a table view might be more preferable. 
    - [react-table](https://github.com/tannerlinsley/react-table) and [react-virtualized](https://github.com/bvaughn/react-virtualized) are good packages to handle this. 
    - If we decided to use the flippable card, a more efficient way to fetch all books with their author details would be required.
- For building an e-commerce app, e.g. a bookstore, [NextJS](https://nextjs.org/) is more suitable as the frontend framework. 
- For backend, [NestJS](https://nestjs.com/) could be used as it has more structure than ExpressJS.

# Content Disclaimer
I do not own any of the images in `/client/src/images/`. They are taken from [designforwriters.com](https://www.designforwriters.com/book-cover-design/).