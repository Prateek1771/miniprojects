import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Recipe = () => {
    const [data, setData] = useState(null)
    const { meal } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
            const jsonData = await get.json();
            setData(jsonData.meals[0]);
        };

        if (meal) {
            fetchData();
        }
    }, [meal]);

    return (
        <>
            {!data ? "Not Found" :  
                <div className='msg'>
                    <img src={data.strMealThumb} alt={data.strMeal} />
                    <div className='info'>
                        <h1>Recipe Detail's</h1>
                        <button>{data.strMeal}</button>
                        <h3>Instructions :</h3>
                        <p>{data.strInstructions}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Recipe;