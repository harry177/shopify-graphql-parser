# Shopify GraphQL Parser - full-stack Shopify shop parser

This application allows you to display products from your Shopify store using the Shopify API. 
Supports: 
- adaptive display of products on different screens 
- displaying images via canvas 
- saving data in the local database and global store

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Go to client folder (`cd client`), repeat `npm install`

## Usage

1. Run `npm start` in the root folder to start the application
2. Open your browser and navigate to `http://localhost:5173`
3. Please know, that server is launching on 3001 port

## Used technologies

1. GraphQL + Shopify api for client an server requests
2. ExpressJS
3. Socket.IO for client notification
4. Redux for store management
5. SQLite as database
6. Canvas
7. Vite as bundler
