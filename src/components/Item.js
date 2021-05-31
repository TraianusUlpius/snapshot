import React from "react";
import Container from "./Container";

const Item = ({ searchTerm }) => {
  return (
    <div className="fluid">
      <h2>{searchTerm} Pictures</h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Item;
