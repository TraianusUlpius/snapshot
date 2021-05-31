import React, { useEffect, useRef } from "react";
import NoImages from "./NoImages";
import isInViewport from "../utils/viewport";

const Gallery = ({ images, active, onClick }) => {
  const elements = useRef([]);

  useEffect(() => {
    if (active) {
      const element = elements.current[active];

      if (isInViewport(element)) {
        return;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
  }, [active]);

  return (
    <div className="scroller">
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image) => {
            const { farm, server, id, secret, title, latitude, longitude } =
              image;
            const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;

            return (
              <img
                ref={(el) =>
                  (elements.current = { ...elements.current, [id]: el })
                }
                onClick={() => onClick({ id, latitude, longitude })}
                key={id}
                src={url}
                alt={title}
                className={active === id ? "active" : active ? "inactive" : ""}
              />
            );
          })
        ) : (
          <NoImages />
        )}
      </div>
    </div>
  );
};

export default Gallery;
