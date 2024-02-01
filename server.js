const fs = require("fs");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const http = require("http");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
  },
});
const port = 3001;

app.use(express.json());

async function fetchDataFromAPI() {
  try {
    const shopifyUrl = "https://cpb-new-developer.myshopify.com/";
    const accessToken = "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";

    const response = await fetch(
      `${shopifyUrl}/admin/api/2024-01/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const dbFile = "mydatabase.db";
      const dbFileExists = fs.existsSync(dbFile);

      if (!dbFileExists) {
        const db = new sqlite3.Database(dbFile);
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            productData TEXT
          )`);
        db.close();
      }

      const db = new sqlite3.Database(dbFile);
      for (const product of data.products) {
        const { id } = product;
        const query =
          "INSERT OR REPLACE INTO products (id, productData) VALUES (?, ?)";
        const params = [id, JSON.stringify(product)];
        db.run(query, params);
      }
      db.close();

      
      io.on("connection", (socket) => {
        io.emit("databaseUpdated", {
            data,
          });
          socket.on('disconnect', () => {
            console.log('user disconnected');
          });
      });
      
    } else {
      console.error("Request failed with status", response.status);
    }
  } catch (error) {
    console.error("Request error:", error);
  }
}

server.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await fetchDataFromAPI();
});
