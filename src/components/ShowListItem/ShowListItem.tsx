import React from 'react';
import './ShowListItem.scss'
import { ShowItem } from '../../types/ShowTypes';

interface Props {
  show: ShowItem;
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
      <p>Rating: {rating.average || 0}</p>
    </div>
  );
};

export default ShowListItem;
