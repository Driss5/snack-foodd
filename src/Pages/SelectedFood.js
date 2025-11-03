import { useLocation } from "react-router-dom";
import '../css/selected-food.css';
import { useNavigate } from "react-router-dom";
import DownLinks from "../Components/DownLinks";
import { useEffect } from "react";
import { useContext } from 'react';
import { FavoriteContexte } from '../Contexte/favoriteContexte';
import { FoodContexte } from '../Contexte/foodsContexte';

function SelectedFood() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { setFavoritesH } = useContext(FavoriteContexte);
    const { foods } = useContext(FoodContexte);
    
    const location = useLocation();
    const { food } = location.state || {};

    // Return To Home Page
    const navigate = useNavigate();
    function handleReturn() {
        return function() {
            navigate(-1);
        }
    }

    // Add To Cart
    function handleAddToCart(foodId) {
        let favorites = JSON.parse(localStorage.getItem('foodFavorite')) || [];
        let foodIndex = favorites.findIndex(foo => foo.foodIndex === foodId);

        if (!favorites[foodIndex]) {
            // hna rah jbdnaha mn contexte
            const food = foods.find(f => f.id === foodId);

            const newItem = {
                foodIndex: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                qty: food.qty,
                size: food.size,
                total: food.total,
                categorie: food.categorie,
                liked: food.liked || false,
                cartStatut: true
            };

            favorites.push(newItem);
            setFavoritesH(favorites);
            localStorage.setItem('foodFavorite', JSON.stringify(favorites));
        } else {
            favorites[foodIndex].cartStatut = true;
            setFavoritesH(favorites);
            localStorage.setItem('foodFavorite', JSON.stringify(favorites));
        }
    }    

    // check wach kayna f cart
    function isFoodInCart(food) {
        const Commandes = JSON.parse(localStorage.getItem('foodFavorite')) || [];

        if (!Array.isArray(Commandes) || Commandes.length === 0 || !food) {
            return false;
        }

        return Commandes.some(f => f && f.foodIndex === food.id && f.cartStatut === true);
    }

  return (
    <div className="bg-0">
        <div className="bg-1">
            <div className="detaille-header">
                <img src="/Images/Icones/flesh-left.svg" alt="Back" onClick={handleReturn()} />
                <div className="detaille-header-p">
                  <p>{ food.name }</p>
                  <p>{ food.price } DH</p>
                </div>
            </div>
            <div className="detaille-food-image">
                <img src={ food.image } alt={ food.name } />
            </div>
            <div className="detaille-food-infos">
                <div className="detaolle-food-info">
                    <img src="/Images/Icones/horloge.png" alt="Clock" />
                    <p>30 min</p>
                </div>
                <div className="detaolle-food-info">
                    <img src="/Images/Icones/calorie.svg" alt="Clock" />
                    <p>500 calories</p>
                </div>
                <div className="detaolle-food-info">
                    <img src="/Images/Icones/kg.svg" alt="Clock" />
                    <p>600 grams</p>
                </div>
            </div>
            <div className="detaolle-food-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique hendrerit aliquam ullamcorper laoreet gravida suspendisse libero turpis consectetur. Amet mi, neque elit</p>
            </div>
            <div className="detaolle-food-btn">
                <button onClick={() => {handleAddToCart(food.id)}}> {isFoodInCart(food) ? 'Added' : 'Add To Cart'}  - { food.price } DH</button>
            </div>
        </div>
        <div className="bg-2"></div>
        <div className="bg-3"></div>
        <div className="bg-4"></div>
        <div className="bg-5"></div>
        <DownLinks />
    </div>
  );
}

export default SelectedFood;
