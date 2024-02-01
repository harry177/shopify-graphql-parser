import { useEffect } from "react";
//import viteLogo from "/vite.svg";
import { socket } from "./socket";
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
  const [getProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    socket.on("databaseUpdated", (data) => {
      data && getProducts();
    });

    return () => {
      socket.off("databaseUpdated");
    };
  }, []);

  function drawImageOnCanvas(canvas, imageSrc) {
    const ctx = canvas.getContext('2d');
    const image = new Image();
  
    image.onload = function() {
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

  const gridContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '20px',
  };

  const containerStyles = {
    width: '100%',
    height: '20vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'black 1px solid'
  };

  const gridItemStyles = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  
  const canvasStyles = {
   
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  if (data) {
    return (
      <div>
        <h2>Product List</h2>
        <div style={gridContainerStyles}>
          {data.products.map((product) => (
            <div key={product.id} style={gridItemStyles}>
              <div style={containerStyles}>
                <canvas
                  ref={(canvas) => drawImageOnCanvas(canvas, product.image)}
                  style={canvasStyles}
                ></canvas>
             </div>
              <p dangerouslySetInnerHTML={createMarkup(product.bodyHtml)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
