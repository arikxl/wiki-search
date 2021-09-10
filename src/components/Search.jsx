import React, {useState, useEffect} from 'react';
import axios from 'axios';


import List from './List';

const Search = () => {
    const [value, setValue] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() =>{
        let timer = null;

        if(value) {
            timer = setTimeout(async () => {
                const {data} = await axios.get("https://en.wikipedia.org/w/api.php", {
                    params: {
                        action: "query",
                        list: "search",
                        origin: "*",
                        format: "json",
                        srsearch: value
                    }
                });
                setResults(data.query.search);
            }, 1000);
        }
        return () => {
            clearTimeout(timer)
        }
    }, [value]);

    return (
        <>
        <form className="ui form">
            <input
             type="text" 
             placeholder="Search Wikipedia..."
             value={value}
             onChange={(e) => setValue(e.target.value)}

            
            />
        </form>
        <List results={results} />
        </>
    );
};

export default Search
