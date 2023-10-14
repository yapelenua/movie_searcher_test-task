import React from 'react';
import './ShowListItem.scss'
import { ShowItem } from '../../types/ShowTypes';
import NotFoundImage from '../NotFoundImage/NotFoundImage';

interface Props {
  show: ShowItem;
}

const ShowListItem: React.FC<Props> = ({ show }) => {
  const { image, name, rating } = show;

  return (
    <div className="show_card">

      <NotFoundImage image={image} name={name} />

      <h2 className='show_card-header'>{name}</h2>
      <p className='show_card-paragraph'>Rating: {rating.average || 0}</p>

    </div>
  );
};

export default ShowListItem;
