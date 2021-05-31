import React from "react";
import Container from "./Container";

const Search = ({ searchTerm }) => {
  return (
    <div className="fluid">
      <h2>{searchTerm} Images</h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Search;
