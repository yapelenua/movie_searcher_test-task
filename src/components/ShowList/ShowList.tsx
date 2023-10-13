/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowListItem from '../ShowListItem/ShowListItem';
import { TailSpin } from "react-loader-spinner";
import './ShowList.scss'
import couple from '../../images/couple.svg'
import empty from '../../images/void.svg'
import unserach from '../../images/unsearsh.svg'


interface showItem {
    id: number
    name: string;
    image: { medium: string };
    rating: { average: number };
}

interface Show {
    id: number;
    show: showItem;
}

const ShowList: React.FC = () => {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (search.length >= 2) {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
                setShows(response.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [search]);

    return (
        <div className='main_wrapper'>
            <div className="input_wrapper">
                <div className="image_wrapper">
                    <img src={couple} alt="couple" />
                </div>
                <div className="sub_wrapper">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Type the show's name"
                        onSubmit={handleSearch}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="shows_wrapper">
                {loading
                    ? <TailSpin color="red" radius={"8px"} />
                    : null
                }


                {search.length >= 2
                    && shows.length === 0
                    && !loading
                    ? (
                        <div className="error_wrapper">
                            <p>Sorry, nothing found with this search.</p>
                            <img src={empty} alt="couple" />
                        </div>
                    ) : null
                }

                <ul className='shows_list'>
                    {search.length < 2 ? (
                        <div className="unserach_wrapper">
                            <p>Let's search some movies</p>
                            <img src={unserach} alt="unserach" />
                        </div>
                    ) : (
                        shows.map((show) => {
                            console.log(show.show.id);
                            return (
                                <li key={show.id}>
                                    <Link to={`/details/${show.show.id}`}>
                                        <ShowListItem show={show.show} />
                                    </Link>
                                </li>
                            );
                        })
                    )}
                </ul>

            </div>
        </div>
    );
};

export default ShowList;
