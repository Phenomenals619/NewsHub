import React from "react";

const Card = ({ data }) => {
  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        } else {
          return (
            <div className="card" key={index}>
              <img src={curItem.urlToImage} alt={curItem.title} />
              <div className="card-body">
                <a
                  className="card-title"
                  onClick={() => window.open(curItem.url)}
                >
                  {curItem.title}
                </a>
                <p className="card-text">{curItem.description}</p>
                <div className="text-center">
                  <button
                    className="btn btn-info"
                    onClick={() => window.open(curItem.url)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
