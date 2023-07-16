import React from "react";
import "./card.css";

const Card = ({ title, description, handleCardClick }) => {
  const handleClick = () => {
    handleCardClick(description);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
