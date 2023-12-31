/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';
import ShowListItem from '../ShowListItem/ShowListItem';
import { TailSpin } from "react-loader-spinner";
import './ShowList.scss'
import couple from '../../images/couple.svg'
import empty from '../../images/void.svg'
import unserach from '../../images/unsearsh.svg'
import { Show } from '../../types/ShowTypes'

const ShowList: React.FC = () => {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState<Show[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const isSearchValid = search.length >= 2;

    const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearch = useCallback(async () => {
        if (isSearchValid) {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
                setShows(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }else {
            setShows([]);
        }
    }, [search]);

    const debouncedHandleSearch = debounce(handleSearch, 1000);

    useEffect(() => {
        debouncedHandleSearch();
        return () => {
            debouncedHandleSearch.cancel();
        };
    }, [search]);

    return (
        <div className='main_wrapper'>
            <div className="input_wrapper">
                <div className="image_wrapper">
                    <img src={couple} alt="couple" className='image_wrapper-image'/>
                </div>
                <div className="sub_wrapper">
                    <input
                        type="text"
                        value={search}
                        onChange={changeQuery}
                        placeholder="Type the show's name"
                    />
                </div>
            </div>
            <div className="shows_wrapper">
                {isLoading && <TailSpin color="red" radius={"8px"} />}

                {isSearchValid
                    && shows.length === 0
                    && !isLoading
                    &&(
                        <div className="error_wrapper">
                            <p className='error_wrapper-paragraph'>Sorry, nothing found with this search.</p>
                            <img src={empty} alt="couple" className='error_wrapper-image'/>
                        </div>
                    )
                }
                <ul className='shows_list'>
                    {!isSearchValid ? (
                        <div className="unserach_wrapper">
                            <p className='unserach_wrapper-paragraph'>Let's search some movies</p>
                            <img src={unserach} alt="unserach" className='unserach_wrapper-image'/>
                        </div>
                    ) : (
                        shows.map((show) => (
                            <li key={show.id}>
                                <Link to={`/details/${show.show.id}`}>
                                    <ShowListItem show={show.show} />
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ShowList;
