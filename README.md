# [Hotel Miranda Dashboard](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/)

[![N|Solid](https://raw.githubusercontent.com/DavidBurguete/MirandaHotelDashboard/013e3db19cefed9b8745a479d04476fa8c9897e7/public/img/hotel.svg)](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/)

This project is a mock up dashboard web page of a fictional hotel (it doesn't have a mobile version). It has a bunch of different pages to show my abilities working with [React](https://react.dev/) + [Redux](https://redux.js.org/), along with [TypeScript](https://www.typescriptlang.org/), HTML and [Styled-Components](https://styled-components.com/) (a js/ts file used in React to add CSS).

Common to every page inside the website, aside from the [/login](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/login), are the lateral menu/nav with each route, a card with the logged user, and the header, with a toggler for the menu visibility, the name of the current view, and an email and notifications icons (that do nothing) and a logout icon.

# Pages featured (routes)

## /login&emsp;
This page doesn't have much to see. Only a user and password form fields that are already filled with the "admin" data.
But if you are interested in seeing what a normal employee sees, you can login with this info:
**USER**: `David Burguete`
**PASSWORD**: `MirandaDashboard`
It only affects a few things inside the [/users](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/users/) page, but are crucial things.

## /dashboard&emsp;
The main page, the first thing someone sees once they log in or refresh the page. 
It has four cards with made up info about data recollected from the hotel client website, and a row of pending messages received from the client website. This ones are real, meaning they do come from there, and they can be archived.

## /rooms&emsp;
Here you can see a list of every room the hotel has available. It can be filtered by "All Rooms", "Available" or "Booked" rooms, and shows an image of the room, with its ID and location, the type of room, amenities, price and status. The employee can create a new room by clicking the button on the top right, delete a row by clickin the X button at the end of the row of the desired room to delete, or can edit the info by clicking the row, which will redirect to a [/rooms/{id}](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/rooms/), which is a form.

## /bookings&emsp;
Similar to the [/rooms](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/rooms) page, here we have another list, but with bookings, with posibility to filter by "All Bookings", "Pending", "Check in" and "Check Out". The rows show the guest name and ID, the dates where the rooms was booked, when is the check in, and when is the check out. Is has a "special request", which is a tooltip with a brief description of the room. The main difference with [/rooms](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/rooms) is that when a row is clicked, it displays a card with all the details abaout the booking.

## /contact
It uses the same component as [/dashboard](http://davidmirandadashboard.s3-website.eu-west-3.amazonaws.com/dashboard), where it displays in a carrousel the pending messages, and bellow's a list with all messages, with filters for "All Messages", "Pending" and "Archived". You can click on the "Pending" status field and it will change it to archived.

## /users
This doesn't have much. Similar to the other routes, it displays a list with the users, and only the admin can create, edit or delete any user beside itself (there's at list one needed user).