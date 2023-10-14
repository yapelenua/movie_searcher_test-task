import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import './ShowDetails.scss';
import home from '../../images/home.svg';
import { ShowDetails } from '../../types/ShowTypes';
import NotFoundImage from '../NotFoundImage/NotFoundImage';

const DetailsScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShowDetails(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShowDetails();
    }, [id]);

    const {
        image,
        name,
        genres,
        rating,
        url,
        status,
        schedule,
        summary,
    } = showDetails || {};

    const scheduleToString = (schedule?.days?.join(', ') || 'No days') + ' at ' + (schedule?.time || 'No time') || 'No schedule available';

    const statusToText = status || 'No status aviable';

    const ratingToText = rating?.average|| 'No rating aviable';

    const genresToText = genres?.join(', ') || 'No genres aviable'

    return (
        <div className="detail_wrapper">
            <Link to="/">
                <img src={home} alt={name} className="home_icon" />
            </Link>
            {isLoading ? (
                <div className="loading">
                    <TailSpin color="blue" radius={8} />
                </div>
            ) : showDetails ? (
                <div className="content_wrapper">

                    <NotFoundImage image={image} name={name}/>

                    <div className="description_wrapper">
                        <h2>{name}</h2>
                        <p>Genres: {genresToText}</p>
                        <p>Rating: {ratingToText}</p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Show Details
                        </a>
                        <p>
                            Status: {statusToText}
                        </p>
                        <p>
                            Schedule:{scheduleToString}
                        </p>
                        <div
                            dangerouslySetInnerHTML={{ __html: summary || '' }}
                        />
                    </div>
                </div>
            ) : (
                <div className="detail_wrapper">
                    <p>Show not found.</p>
                </div>
            )}
        </div>
    );
};

export default DetailsScreen;
