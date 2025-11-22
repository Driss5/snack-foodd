"use client"

import { motion, useScroll } from "motion/react"
import { useRef, useContext } from "react"
import { FoodContexte } from '../Contexte/foodsContexte';
import { useNavigate } from "react-router-dom";


function Item({ food }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    })

    const { foods } = useContext(FoodContexte)
    const navigate = useNavigate();

    function handleSelectedFood(id) {
        const food = foods.find((f) => {return f.id === id})
        navigate("/pageSelectedFood", { state: { food: food } });
    }

    return (
        <section style={itemContainer}>
            <div ref={ref} style={item}>
                {/* <figure style={progressIconContainer}> */}
                    <svg
                        style={progressIcon}
                        width="75"
                        height="75"
                        viewBox="0 0 100 100"
                    >
                        <circle
                            style={progressIconBg}
                            cx="50"
                            cy="50"
                            r="30"
                            pathLength="1"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="30"
                            pathLength="1"
                            style={{
                                ...progressIconIndicator,
                                pathLength: scrollYProgress,
                            }}
                        />
                    </svg>
                {/* </figure> */}
                <div className="food-card" onClick={() => handleSelectedFood(food.id)}>
                    <div className="food-card-img">
                        <img src={food.image} alt={food.name} />
                    </div>

                    <div className="food-card-info">
                        <h3 className="food-name">{food.name}</h3>
                        <p className="food-desc">{food.offreDescription}</p>
                        <p className="food-price">{food.offrePrice} DH</p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default function TrackElementWithinViewport() {
    const { foods } = useContext(FoodContexte)
    const newFoods = foods.filter(f => f.offre === true)

    return (
        <>
            {newFoods.map((food) => (
                <Item key={food.id} food={food} />
            ))}
        </>
    )
}


/**
 * ==============   Styles   ================
 */

const itemContainer = {
    height: "100vh",
    maxHeight: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const progressIconContainer = {
    position: "sticky",
    top: 0,
    width: 80,
    height: 80,
    margin: 0,
    padding: 0,
}

const processCircle = {
    strokeDashoffset: 0,
    strokeWidth: 5,
    fill: "none",
}

const progressIcon = {
    ...processCircle,
    transform: "translateX(-100px) rotate(-90deg)",
    stroke: "#ff0088",
}

const progressIconIndicator = {
    ...processCircle,
    strokeDashoffset: 0,
    strokeWidth: 5,
    fill: "none",
}

const progressIconBg = {
    opacity: 0.2,
}

const item = {
    width: 200,
    height: 250,
    border: "2px dotted #ff0088",
    position: "relative",
}