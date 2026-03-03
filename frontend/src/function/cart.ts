import triangle from '../assets/triangle.png'
import simpleinterest from '../assets/simpleinterest.png'
import compoundinterest from '../assets/compoundinterest.png'
import circle from '../assets/circle.png'

export default interface CartsProp {
    title: string;
    link: string;
    image: string;
}


export const carts: CartsProp[] = [
    {
        title: "Triangle",
        image: triangle,
        link: "/triangle",
    },
    {
        title: "Circle",
        image: circle,
        link: "/circle",
    },
    {
        title: "Compound Interest",
        image: compoundinterest,
        link: "/compoundinterest",
    },
    {
        title: "Simple Interest",
        image: simpleinterest,
        link: "/simpleinterest",
    }
]