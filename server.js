const express = require("express");
const cors = require("cors");
const app = express();

const port = 3001;

app.use(cors());

app.use(express.json());

app.post("/api/append-super", async (req, res) => {
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
      res.json({ result: data });
    } else {
      console.error("Request failed with status", response.status);
      res
        .status(response.status)
        .json({ error: "Error with a request to the Shopify API" });
    }
  } catch (error) {
    console.error("Wequest error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
