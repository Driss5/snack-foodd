import Navbar from '../Components/Navbar';
import '../css/home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import DownLinks from '../Components/DownLinks';
import { useContext } from 'react';
import { FavoriteContexte } from '../Contexte/favoriteContexte';
import { FoodContexte } from '../Contexte/foodsContexte';

function Home() {

    // Filter (Categories)
    const [categories, setCategories] = useState([
        { id: 1, name: 'all', iconNormal: '/Images/Icones-Food/burger.png', iconActive: '/Images/Icones-Food/burger-w.png', alt: 'Burger', active: true },
        { id: 2, name: 'Pizza', iconNormal: '/Images/Icones-Food/pizza.png', iconActive: '/Images/Icones-Food/pizza-w.png', alt: 'Pizza', active: false },
        { id: 3, name: 'salad', iconNormal: '/Images/Icones-Food/frite.png', iconActive: '/Images/Icones-Food/frite-w.png', alt: 'Frites', active: false },
        { id: 4, name: 'tacos', iconNormal: '/Images/Icones-Food/veggies.png', iconActive: '/Images/Icones-Food/veggies-w.png', alt: 'Veggies', active: false },
        { id: 5, name: 'drink', iconNormal: '/Images/Icones-Food/drink.png', iconActive: '/Images/Icones-Food/drink-w.png', alt: 'Drinks', active: false },
    ]);

    const [showCategorie, setShowCategorie] = useState('all');
    function handleChangeCategorie(categorie) {
        const updatedCategories = categories.map(cat => ({
            ...cat,
            active: cat.name === categorie
        }));
        setCategories(updatedCategories);
        setShowCategorie(categorie);
    }

    const { foods } = useContext(FoodContexte);

    // Favorites
    const { favoritesH, setFavoritesH } = useContext(FavoriteContexte);

    function handleAddFavorite(foodId) {
            let foodIndex = foods.findIndex(food => food.id === foodId);
            if (foodIndex !== -1) {
                
                foods[foodIndex].liked = !foods[foodIndex].liked;
                let favorites = JSON.parse(localStorage.getItem('foodFavorite')) || [];

                const newItem = {
                    foodIndex: foodIndex + 1,
                    name: foods[foodIndex].name,
                    price: foods[foodIndex].price,
                    image: foods[foodIndex].image,
                    qty: foods[foodIndex].qty,
                    size: foods[foodIndex].size,
                    total: foods[foodIndex].total,
                    categrie: foods[foodIndex].categorie,
                    liked: foods[foodIndex].liked,
                    cartStatut: foods[foodIndex].cartStatut
                };

                const existingIndex = favorites.findIndex(f => f.foodIndex === foodIndex + 1);
                if (existingIndex !== -1) {
                    favorites[existingIndex].liked = !favorites[existingIndex].liked;
                } else {
                    favorites.push(newItem);
                }

                setFavoritesH(favorites);
                localStorage.setItem('foodFavorite', JSON.stringify(favorites));
            } else {
                alert('kayyyn chi mochkil khoyaa ghi 3ayat l srbaille hhh');
            }
    }

    // t9ra mn localStorag wach food liked wla la
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("foodFavorite")) || [];
        setFavoritesH(saved);
    }, [setFavoritesH]);

    // Selected Food Navigation
    const navigate = useNavigate();

    function handleSelectedFood(id) {
        const food = foods.find((f) => {return f.id === id})
        navigate("/pageSelectedFood", { state: { food: food } });
    }

    return (
        <div>
            <Navbar />
            <div className='home-container'>
                <div className='welcomme'>
                    <p>Good evening, Welcomme</p>
                </div>
                <div className='search-container'>
                    <div className='search'>
                        <img src='/Images/Icones/search.png' alt='Search' />
                        <input type='text' placeholder='Search for food, coffe, etc..' name='search'/>
                    </div>
                </div>
                <div className='categories-container'>
                    {categories.map((category) => (
                        <div className='categorie-card' key={category.id} onClick={() => {handleChangeCategorie(category.name)}} style={category.active ? {backgroundColor : '#F66141'} : {} }>
                            <img src={category.active ? category.iconActive : category.iconNormal } alt={category.alt} />
                            <p style={category.active ? {color : 'white'} : {} }>{category.name}</p>
                        </div>
                    ))}
                </div> 
                <div className='categorie-title'>
                    <p>{ showCategorie }</p>
                </div>
                <div className='food-cards-container'>
                    {foods.map((food) => (
                        showCategorie.toLowerCase() === food.categorie.toLocaleLowerCase() || showCategorie.toLowerCase() === 'all' ? (
                            <div className='food-card' key={food.id}>
                                <div className='food-card-img'>
                                    <img src={food.image} alt='Food 1' onClick={() => handleSelectedFood(food.id)} />
                                </div>
                                <div className='food-card-body'>
                                    <div className='food-card-name'>
                                        <p>{food.name}</p>
                                    </div>
                                    <div className='food-card-prix'>
                                        <p>{food.price} DH</p>
                                        <img src='/Images/Icones/heart.svg' alt='Heart' onClick={() => { handleAddFavorite(food.id) }} className={favoritesH.some(fav => fav.foodIndex === food.id && fav.liked) ? 'heartActive' : ''}/>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
                <DownLinks />
            </div>
        </div>
    );
}
export default Home;