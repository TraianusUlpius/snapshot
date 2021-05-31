import React from "react";
import { useQuery } from "react-query";
import { apiKey } from "../api/config";
import Map from "./Map";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {
  const { isLoading, data } = useQuery(["images", searchTerm], () =>
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&has_geo=1&per_page=24&extras=geo&format=json&nojsoncallback=1`
    ).then((res) => res.json())
  );

  return (
    <div className="photo-container">
      {isLoading ? <Loader /> : <Map images={data.photos.photo} />}
    </div>
  );
};

export default Container;
