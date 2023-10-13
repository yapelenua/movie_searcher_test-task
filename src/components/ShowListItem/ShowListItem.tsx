import React from 'react';
import './ShowListItem.scss'

interface Show {
    id: number;
    name: string;
    image: { medium: string };
    rating: { average: number };
  }

interface Props {
  show: Show;
}

const ShowListItem: React.FC<Props> = ({ show }) => {
  const { image, name, rating } = show;

  return (
    <div className="show-card">
      {image && image.medium ? (
        <img src={image.medium} alt={name} />
      ) : (
        <div className="unload_image">
          <p>Image is not aviable</p>
        </div>
      )}
      <h2>{name}</h2>
      <p>Rating: {rating.average | 0}</p>
    </div>
  );
};

export default ShowListItem;
