import React from 'react'
import { NavLink } from 'react-router-dom';
import Recipe from './Recipe';

const Cards = ({ detail }) => {
    console.log(detail);
    return (
        <div className='meals'>
            {!detail ? "Sorry Data Not Found" : detail.map((curItem) => {
                console.log(curItem)
                return (
                    <div className='mealImg' key={curItem.idMeal}>
                        <img src={curItem.strMealThumb} alt={curItem.strMeal} />
                        <p>{curItem.strMeal}</p>
                        <NavLink to={`/${curItem.idMeal}`}>
                            <button>Recipe</button>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default Cards