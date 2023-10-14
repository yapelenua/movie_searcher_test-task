import React from 'react';
import './NotFoundImage.scss';
import { ShowImage } from '../../types/ShowTypes';


interface Props{
    image?:ShowImage;
    name?:string;
}

const NotFoundImage: React.FC<Props> = ({ image, name }) => {
    return (
        <div>
            {image && image.medium ? (
                <img src={image.medium} alt={name} className='movie_img' />
            ) : (
                <div className="unload_image">
                    <p className='unload_image-paragraph'>Image is not available</p>
                </div>
            )}
        </div>
    );
};

export default NotFoundImage;





