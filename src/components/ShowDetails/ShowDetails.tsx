import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import axios from 'axios';
import './ShowDetails.scss'
import home from '../../images/home.svg'

interface ShowDetails {
    id: number;
    name: string;
    image: { medium: string} ;
    genres: string[];
    rating: { average: number };
    url: string;
    status: string;
    schedule: { days: string[]; time: string };
    summary: string;
}

const DetailsScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchShowDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShowDetails(response.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchShowDetails();
    }, [id]);

    if (!showDetails) {
        return (
            <div className='detail_wrapper'>
                <Link to="/"><img src={home} alt="Home" className='home_icon'/></Link>
                <p>Show not found.</p>
            </div>
        );
    }

    const {
        image,
        name,
        genres,
        rating,
        url,
        status,
        schedule,
        summary,
    } = showDetails;

    return (
        <div className='detail_wrapper'>
            <Link to="/"><img src={home} alt={name} className='home_icon'/></Link>
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
                    <p>Genres: {genres.join(', ')}</p>
                    <p>Rating: {rating ? rating.average : 'N/A'}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Show Details
                    </a>
                    <p>Status: {status}</p>
                    <p>Schedule: {schedule ? schedule.days.join(', ') + ' at ' + schedule.time : 'N/A'}</p>
                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                </div>
            </div>
            {loading && <TailSpin color="blue" radius={"8px"} />}
        </div>
    );
    
};

export default DetailsScreen;


