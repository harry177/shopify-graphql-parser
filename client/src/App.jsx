import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { setProducts } from "./store/productSlice";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import "./App.css";

const GET_PRODUCTS = gql`
  {
    products {
      id
      bodyHtml
      image
    }
  }
`;

function createMarkup(html) {
  return { __html: html };
}

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [getProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products));
    }
  }, [data]);

  useEffect(() => {
    socket.on("databaseUpdated", (data) => {
      data && getProducts();
    });

    return () => {
      socket.off("databaseUpdated");
    };
  }, []);

  function drawImageOnCanvas(canvas, imageSrc) {
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.onload = function () {
      const { width, height } = image;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellWidth = canvas.width;
      const cellHeight = canvas.height;

      const scale = Math.min(cellWidth / width, cellHeight / height);

      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      const x = (cellWidth - scaledWidth) / 2;
      const y = (cellHeight - scaledHeight) / 2;

      ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
    };

    image.src = imageSrc;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  if (products) {
    return (
      <div>
        <h2>Product List</h2>
        <div className="grid-container">
          {products.map((product) => (
            <div key={product.id} className="item-container">
              <div className="image-container">
                <canvas
                  ref={(canvas) => drawImageOnCanvas(canvas, product.image)}
                  className="canvas"
                ></canvas>
              </div>
              <p className="product-description" dangerouslySetInnerHTML={createMarkup(product.bodyHtml)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
