import React, { useCallback, useState, Fragment } from "react";
import DeckGL from "@deck.gl/react";
import { IconLayer } from "@deck.gl/layers";
import { FlyToInterpolator } from "@deck.gl/core";
import { StaticMap } from "react-map-gl";
import MapItem from "./MapItem";
import Gallery from "./Gallery";

const Map = ({ images }) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [viewState, setViewState] = useState({
    active: null,
    info: {
      pitch: 0,
      bearing: 0,
      longitude: 48.524449,
      latitude: -2.652339,
      zoom: 1,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator(),
    },
  });

  const onHover = useCallback((d) => {
    setHoverInfo(d.object ? d : null);
  }, []);

  const onGalleryItemClick = ({ id, latitude, longitude }) => {
    setViewState({
      active: id,
      info: {
        ...viewState.info,
        zoom: 10,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  };

  return (
    <Fragment>
      <Gallery
        images={images}
        active={hoverInfo?.object?.id}
        onClick={onGalleryItemClick}
      />
      <div className="map">
        <DeckGL
          initialViewState={viewState.info}
          controller={true}
          layers={[
            new IconLayer({
              id: "bart-stations",
              data: images,
              pickable: true,
              getPosition: (d) => [
                parseFloat(d.longitude),
                parseFloat(d.latitude),
              ],
              sizeScale: 15,
              onHover: onHover,
              onClick: (d) => {
                const { id, latitude, longitude } = d.object;

                onGalleryItemClick({ id, latitude, longitude });
              },
              getSize: (d) => 5,
              getIcon: (d) => {
                return {
                  url: `${process.env.PUBLIC_URL}/${
                    viewState.active === d.id
                      ? "marker-active.png"
                      : "marker.png"
                  }`,
                  width: 96,
                  height: 96,
                  anchorY: 96,
                  anchorX: 48,
                };
              },
              updateTriggers: {
                getIcon: viewState,
              },
            }),
          ]}
        >
          <StaticMap
            mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxApiAccessToken="pk.eyJ1IjoibW91YXQiLCJhIjoiY2tsYzFjOTVjMTBxbDJ2czhnN3UxeHBrbiJ9.UMBY9tjvmtcU6bUNANQ68g"
          />
        </DeckGL>
        {hoverInfo && (
          <div
            className="tooltip"
            style={{
              left: hoverInfo.x + 20,
              top: hoverInfo.y - 10,
            }}
          >
            <MapItem data={hoverInfo} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Map;
