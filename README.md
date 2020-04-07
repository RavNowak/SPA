# IT SPA

LIVE: https://ravnowak.github.io/SPA/

The project involves writing a Single Page Application for a SPA center dedicated to programmers.

The application should allow: 

- Browse available treatments
- Adding selected treatments to the basket
- Choice of arrival and departure date and room  
- User registration (optional)
- User login (optional)
- Summary of the order

## Booking

Create a basket component that displays a summary of the order.
The basket should also allow corrections to be made to the order.
Users cannot select an earlier arrival date than the current one.
The selected departure date cannot be more than a year from the date of arrival.

## Registration

Create a user registration component with an optional password strength meter.
Registration consists in saving user data (e-mail and password) in the file `database.json`.
It should not be possible to register a user with an identical e-mail address.

## Log in

Create a user login component that will optionally display the user's avatar.
Logging in consists in comparing the data provided by the user (e-mail and password) with those in the file `database.json`.

## Rooms

The database of examples of rooms in the IT SPA center can be found in the file `database.json`.
You can freely change existing rooms or add your own.

## Treatments 

The database of examples of IT SPA center treatments can be found in the file `database.json`.
You can change existing treatments or add your own.

## Basket

Create a basket component that will display added rooms and treatments when you hover your mouse over it.
The cart must survive the page reloading, so try using cookies.

## Stack

- HTML, Bootstrap
- CSS, Sass, LESS
- JavaScript, jQuery
- Node, Express
