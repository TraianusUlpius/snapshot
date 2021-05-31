import React from "react";

const MapItem = ({ data }) => {
  const { farm, server, id, secret, title } = data.object;

  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;

  return (
    <div className="map-item">
      <span>{title}</span>
      <img key={id} src={url} alt={title} />
    </div>
  );
};

export default MapItem;
