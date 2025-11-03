import Navbar from "../Components/Navbar";
import DownLinks from "../Components/DownLinks";
import '../css/favorite.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { FoodContexte } from '../Contexte/foodsContexte';

function PageLikes() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let favorites = JSON.parse(localStorage.getItem('foodFavorite')) || [];
    const likedFoods = favorites.filter(food => food.liked);

    function handleChangeStatut(foodIndex) {
        let updatedFavorites = favorites.map(food => {
            if (food.foodIndex === foodIndex) {
                return { ...food, liked: !food.liked };
            }
            return food;
        });
        favorites = updatedFavorites;
        localStorage.setItem('foodFavorite', JSON.stringify(updatedFavorites));
        window.location.reload();
    }

    const { foods } = useContext(FoodContexte);

    const navigate = useNavigate();
    function handleSelectedFood(id) {
        const food = foods.find((f) => {return f.id === id})
        navigate("/pageSelectedFood", { state: { food: food } });
    }

    return (
        <div className="favorite-container">
            <Navbar />
            <div>
                <div className="favorite-header">
                    <img src="/Images/Icones/favorite-play.png" alt="Back" />
                    <p>Favorites</p>
                </div>

                <div className='food-cards-container'>
                    {likedFoods.map((food) => (
                        <div className='food-card' key={food.foodIndex}>
                            <div className='food-card-img'>
                                <img src={food.image} alt='Food 1' onClick={() => handleSelectedFood(food.foodIndex)} />
                            </div>
                            <div className='food-card-body'>
                                <div className='food-card-name'>
                                    <p>{food.name}</p>
                                </div>
                                <div className='food-card-prix'>
                                    <p>{food.price} DH</p>
                                    <img src='/Images/Icones/heart.svg' alt='Heart'  className='heartActive' onClick={() => handleChangeStatut(food.foodIndex)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DownLinks />
        </div>
    );
}
export default PageLikes;