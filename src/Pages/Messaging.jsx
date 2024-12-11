import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header';

function Messaging() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setData(response.data);
        }
        fetchData();
    }, [])

    return (
        <>
        <Header />
            <ul style={{ marginTop:'100px'}}>
                {data.map(item => (
                    <div style={{ textDecoration: 'none'}} key={item.id}> {item.id}  {item.title}  </div>
                ))}
            </ul>

        </>
    )
}
export default Messaging
