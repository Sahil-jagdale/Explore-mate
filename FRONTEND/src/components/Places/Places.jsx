import PlaceCard from './PlaceCard'
import Img1 from "../../assets/places/srinagar2.avif";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/udaipur.avif";
import Img4 from "../../assets/places/udupi.avif";
import Img5 from "../../assets/places/gulmarg.avif";
import Img6 from "../../assets/places/goa.avif";


const PlacesData = [
    {
        img: Img1,
        title: "Nigeen Lake",
        location: "shrinagar",
        description: "Nestled in the foothills of the Zabarwan Ranges, this beautiful lake is surrounded by willow and poplar trees..",
        price: "1-2 hours",
        type: "Approx time",
    },
    {
        img: Img2,
        title: "Taj Mahal",
        location: "Aagra",
        description:
            "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
        price: "2-3 hours",
        type: "Approx time",
    },
    {
        img: Img3,
        title: "City Palace",
        location: "Udaipur",
        description:
            "The City Palace, perched atop a hill overlooking the lake, is a stunning blend of courtyards, pavilions, terraces, corridors, rooms, and hanging gardens. Enclosed by fortified walls, the main entrance is through the triple-arched Tripolia gate, featuring eight marble porticos. The palace is currently home to two luxurious hotels, a school and the popular City Palace Museum.",
        price: "2-3 hours",
        type: "Approx time",
    },
    {
        img: Img4,
        title: "Udupi",
        location: "karnataka",
        description: "A coastal town in Karnataka, Udupi is a hidden gem with pristine beaches, divine temples, rich heritage and cultural traditions that add to its charm.",
        price: "1-2 hours",
        type: "Approx time",
    },
    {
        img: Img5,
        title: "Gondola Ride",
        location: "Gulmarg",
        description:
            "Considered as one of Asia's longest and highest cable car ride, this entire ride comprises of two stages-Gulmarg to Kongdoori, and Kongdoori to Apharwat Peak.",
        price: "Min 2 hours",
        type: "Approx time",
    },
    {
        img: Img6,
        title: "Majorda Beach",
        location: "Goa",
        description:
            "Majorda Beach is situated in South Goa, it geographically features between Utorda Beach and Betalbatim Beach. The lovely golden sand beach is flanked by swaying palms trees and can be your perfect haunt for seeking some tranquillity from the city life.",
        price: "2-3 hours",
        type: "Approx time",
    },
];


const Places = ({ handleOrderPopup }) => {
    return (
        <>
            <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
                <section data-aos="fade-up" className="container ">
                    <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
                        Best Places to Visit
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {PlacesData.map((item, index) => (
                            <PlaceCard
                                handleOrderPopup={handleOrderPopup}
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>

    )
}

export default Places