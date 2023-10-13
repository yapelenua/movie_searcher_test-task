import React from 'react';
import './ShowListItem.scss'
import { ShowItem } from '../../types/ShowTypes';

interface Props {
  show: ShowItem;
}

const ShowListItem: React.FC<Props> = ({ show }) => {
  const { image, name, rating } = show;

  return (
    <div className="show_card">
      {image && image.medium ? (
        <img className='show_card-img' src={image.medium} alt={name} />
      ) : (
        <div className="unload_image">
          <p className='unload_image-paragraph'>Image is not aviable</p>
        </div>
      )}
      <h2 className='show_card-header'>{name}</h2>
      <p className='show_card-paragraph'>Rating: {rating.average || 0}</p>
    </div>
  );
};

export default ShowListItem;
