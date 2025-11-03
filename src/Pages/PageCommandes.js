import '../css/favorite.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// Material UII
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function PageCommandes() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const options = [
        'Clear All',
    ];

    let Commandes = JSON.parse(localStorage.getItem('foodFavorite')) || [];
    const orderedFoods = Commandes.filter(food => food.cartStatut);

    function handleChangeCartStatu(foodIndex) {
        let updatedCommandes = Commandes.map(food => {
            if (food.foodIndex === foodIndex) {
                return { ...food, cartStatut: false, qty: 1, total: food.price};
            }
            return food;
        });
        Commandes = updatedCommandes;
        localStorage.setItem('foodFavorite', JSON.stringify(updatedCommandes));
        window.location.reload();
    }

    let initTotalProduit = {};
    orderedFoods.forEach(food => {
        initTotalProduit[food.foodIndex] = food.price;
    });
    const totalFinal = Object.values(initTotalProduit).reduce((sum, price) => sum + price, 0);

    let [quantite, setQuantite] = useState({});
    let [totalProduit, setTotalProduit] = useState({});
    let [totalOrder, setTotalOrder] = useState(totalFinal);

    function handleIncrement(foodIndex) {
        const foodToUpdate = Commandes.find(food => food.foodIndex === foodIndex);
        if (foodToUpdate) {

        setQuantite(prev => {
            const newQty = (prev[foodIndex] || 1) + 1;

            setTotalProduit(totalPrev => {
                const updatedTotalProduit = {
                    ...totalPrev,
                    [foodIndex]: foodToUpdate.price * newQty
                };

                const updatedCommandes = Commandes.map(food =>
                    food.foodIndex === foodIndex
                        ? { ...food, qty: newQty, total: foodToUpdate.price * newQty }
                        : food
                );
                localStorage.setItem('foodFavorite', JSON.stringify(updatedCommandes));

                return updatedTotalProduit;
            });

            return {
                ...prev,
                [foodIndex]: newQty
            };
        });

        setTotalOrder(prevTotal => prevTotal + foodToUpdate.price);
    }
}

        function handleDecrement(foodIndex) {
        const foodToUpdate = Commandes.find(food => food.foodIndex === foodIndex);
        if (foodToUpdate) {

        setQuantite(prev => {
            const newQty = (prev[foodIndex] || 1) - 1;

            setTotalProduit(totalPrev => {
                const updatedTotalProduit = {
                    ...totalPrev,
                    [foodIndex]: foodToUpdate.price * newQty
                };

                const updatedCommandes = Commandes.map(food =>
                    food.foodIndex === foodIndex
                        ? { ...food, qty: newQty, total: foodToUpdate.price * newQty }
                        : food
                );
                localStorage.setItem('foodFavorite', JSON.stringify(updatedCommandes));

                return updatedTotalProduit;
            });

            return {
                ...prev,
                [foodIndex]: newQty
            };
        });

        if ((quantite[foodIndex] || 1) > 1) {
            setTotalOrder(prevTotal => prevTotal - foodToUpdate.price);
        }
    }
}

    // Material UI (3 point clear all)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = (option) => {
            setAnchorEl(null);
            if (option === 'Clear All') {
                let clearedCommandes = Commandes.map(food => ({
                    ...food,
                    cartStatut: false
                }));
                localStorage.setItem('foodFavorite', JSON.stringify(clearedCommandes));
                window.location.reload();
            }
        };
    const ITEM_HEIGHT = 48;

    const [myForm, setMyForm] = useState({
        name: '',
        etage: '',
        numTable: ''
    });

    // Dialog
    const [openD, setOpenD] = useState(false);
    const handleClickOpenD = () => {

        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    function handleConfirmOrder() {
        let orderFood = orderedFoods.map(food => ({
            foodIndex: food.foodIndex,
            name: food.name,
            quantity: quantite[food.foodIndex] || 1,
            totalPrice: totalOrder
        }));
        const allFoods = orderFood.map(f => `${f.name} (x${f.quantity})`).join(', ');
        alert(`Thank you ${myForm.name}! Your order has been placed, Your order is ${allFoods} `);

        let clearedCommandes = Commandes.map(food => ({
            ...food,
            cartStatut: false,
            qty: 1,
            total: food.price
        }));
        localStorage.setItem('foodFavorite', JSON.stringify(clearedCommandes));
        setTotalOrder(0);
        setOpenD(false);
    }

  return (
    <div className='containerr'>
        <div className='cart-container'>
            <div className='cart'>
                <div className='cart-header'>
                    <Link to='/'>
                        <img src='/Images/Icones/flesh-left-cart.svg' alt='flesh-left' />
                    </Link>
                    <p>Cart</p>
                    <img src='/Images/Icones/points-cart-right.svg' alt='flesh-right' onClick={handleClick} />
                          <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={open}
                                disableEnforceFocus
                                disableRestoreFocus
                                disableAutoFocusItem
                                onClose={handleClose}
                                slotProps={{
                                paper: {
                                    style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                    },
                                },
                                list: {
                                    'aria-labelledby': 'long-button',
                                },
                                }}
                            >
                                {options.map((option) => (
                                <MenuItem key={option} onClick={() => {handleClose(option)}}>
                                    {option}
                                </MenuItem>
                                ))}
                            </Menu>
                </div>
                <div className='cart-body'>
                    <div className='cart-items'>
                        {
                            orderedFoods.map((food) => (
                                <div className='cart-item' key={food.foodIndex}>
                                    <div className='cart-image'>
                                        <img src={food.image} alt={food.name} />
                                    </div>
                                    <div className='cart-text'>
                                        <p>{food.name}</p>
                                        <div className='cart-text-two'>
                                            <p>Size : XL</p>
                                            <p>Qty : {quantite[food.foodIndex] || 1}</p>
                                        </div>
                                        <p>{totalProduit[food.foodIndex] || food.price}DH</p>
                                    </div>
                                    <div className='cart-icones'>
                                        <div className='cart-icone-close'>
                                            <img src='/Images/Icones/close.svg' alt='close' onClick={() => {handleChangeCartStatu(food.foodIndex)}} />
                                        </div>
                                        <div className='cart-icone-qty'>
                                            <img src='/Images/Icones/rectangle top.svg' alt='INCREMENT' onClick={() => handleIncrement(food.foodIndex)} />
                                            <img src='/Images/Icones/rectangle bottom.svg' alt='DECREMENT' onClick={() => handleDecrement(food.foodIndex)} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className='cart-footer'>
                    <p>Price Details</p>
                    <div className='price-detaills'>
                        <div>
                            <p>Total Product Price</p>
                            <p>Total Discounts</p>
                        </div>
                        <div>
                            <p>{totalOrder}DH</p>
                            <p>0DH</p>
                        </div>
                    </div>
                    <div className='price-total'>
                        <p>Order Total</p>
                        <p>{totalOrder}DH</p>
                    </div>
                    <div className='cart-footer-btn'>
                        <button onClick={handleClickOpenD}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Dialog
                open={openD}
                onClose={handleCloseD}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id='dialog-container'
            >
                <DialogTitle id="alert-dialog-title">
                {"Please Confirme Your Order"}
                </DialogTitle>
                <p id='dialogP'>L order ghadi tji ta l3ndk nchallh ghi sbar chwya hh, wila mabghitch tssna siir f 7aalk</p>
                <DialogContent style={{height : '325px'}}>
                    <form>
                        <div className='dialog-inputs'>
                            <div className='dialog-input'>
                                <input type='text' placeholder='Your Name' required name='name' value={myForm.name} onChange={(e) => {setMyForm({...myForm, name : e.target.value})}} />
                            </div>
                            <div className='dialog-input'>
                                <input type='text' placeholder='Etage' required name='etage' value={myForm.etage} onChange={(e) => {setMyForm({...myForm, etage : e.target.value})}} />
                            </div>
                            <div className='dialog-input'>
                                <input type='text' placeholder='Num Table' required name='num_Table' value={myForm.numTable} onChange={(e) => {setMyForm({...myForm, numTable : e.target.value})}} />
                            </div>
                        </div>
                    </form>
                    <div className='dialog-action'>
                        <Button onClick={handleConfirmOrder}>Order Now</Button>
                    </div>
                    <div className='dialoge-note-container'>
                        <div className='line-1'></div>
                        <div className='dialog-note'>
                            <p>Please Confirme Your Order</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
export default PageCommandes;