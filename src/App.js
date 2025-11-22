import Home from './Pages/Home';
import SelectedFood from './Pages/SelectedFood';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLikes from './Pages/PageLikes';
import PageCommandes from './Pages/PageCommandes';
import PageOffre from './Pages/PageOffre';
import { useState } from 'react';
import { FavoriteContexte } from './Contexte/favoriteContexte';
import { FoodContexte } from './Contexte/foodsContexte';

function App() {

  const [favoritesH, setFavoritesH] = useState([]);

  const foods = [
      { id: 1, name: 'Pizza Talienne', price: 80, image: '/Images/food/7.png', qty : 1, size : 'M', total : 0, liked : false, categorie : 'pizza', cartStatut : false, offreDescription : 'dddsd asdasd', offre : true, offrePrice : 15 },
      { id: 2, name: 'Cheese Burger', price: 50, image: '/Images/food/13.png', qty : 1, size : 'XL', total : 0, liked : false, categorie : 'burger', cartStatut : false, offreDescription : '', offre : true, offrePrice : 0 },
      { id: 3, name: 'Veggie Salad', price: 40, image: '/Images/food/2.png', qty : 1, size : 'L', total : 0, liked : false, categorie : 'salad', cartStatut : false, offreDescription : '', offre : false, offrePrice : 0 },
      { id: 4, name: 'French Fries', price: 30, image: '/Images/food/5.png', qty : 1, size : 'XXL', total : 0, liked : false, categorie : 'pizza', cartStatut : false, offreDescription : '', offre : false, offrePrice : 0 },
      { id: 5, name: 'Soft Drink', price: 20, image: '/Images/food/6.png', qty : 1, size : 'M', total : 0, liked : false, categorie : 'drink', cartStatut : false, offreDescription : '', offre : false, offrePrice : 0 },
      { id: 6, name: 'Tacoos', price: 20, image: '/Images/food/6.png', qty : 1, size : 'L', total : 0, liked : false, categorie : 'tacoos', cartStatut : false, offreDescription : '', offre : false, offrePrice : 0 },
  ]

  return (
    <div className="App">
            <Router>
              <FoodContexte.Provider value={{foods}}>
              <FavoriteContexte.Provider value={{favoritesH, setFavoritesH}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pageSelectedFood" element={<SelectedFood />} />
                    <Route path="/pageLikes" element={<PageLikes />} />
                    <Route path="/pageCommandes" element={<PageCommandes />} />
                    <Route path="/PageOffre" element={<PageOffre />} />
                </Routes>
              </FavoriteContexte.Provider>
              </FoodContexte.Provider>
            </Router>
    </div>
  );
}

export default App;
