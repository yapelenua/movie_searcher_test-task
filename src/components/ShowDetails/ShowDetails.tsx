import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import './ShowDetails.scss';
import home from '../../images/home.svg';
import { ShowDetails } from '../../types/ShowTypes';

const DetailsScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShowDetails(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
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

    return (
        <div className="detail_wrapper">
            <Link to="/">
                <img src={home} alt={name} className="home_icon" />
            </Link>

            {loading ? (
                <div className="loading">
                    <TailSpin color="blue" radius={8} />
                </div>
            ) : showDetails ? (
                <div className="content_wrapper">
                    <div className="image_wrapper">
                        {image && image.medium ? (
                            <img src={image.medium} alt={name} />
                        ) : (
                            <div className="unload_image">
                                <p>Image is not available</p>
                            </div>
                        )}
                    </div>

                    <div className="description_wrapper">
                        <h2>{name}</h2>
                        <p>Genres: {genres?.join(', ') || 'N/A'}</p>
                        <p>Rating: {rating ? rating.average : 'N/A'}</p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Show Details
                        </a>
                        <p>Status: {status || 'N/A'}</p>
                        <p>
                            Schedule:{' '}
                            {schedule?.days.join(', ') + ' ,kefnsat ' + schedule?.time || 'No schedule available'}
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
