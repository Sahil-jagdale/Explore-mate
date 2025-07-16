import { useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const cities = [
    {
        city: "New Delhi",
        airport_name: "Indira Gandhi International Airport",
        iata_code: "DEL",
    },
    {
        city: "Mumbai",
        airport_name: "Chhatrapati Shivaji Maharaj International Airport",
        iata_code: "BOM",
    },
    {
        city: "Bangalore",
        airport_name: "Kempegowda International Airport",
        iata_code: "BLR",
    },
    {
        city: "Chennai",
        airport_name: "Chennai International Airport",
        iata_code: "MAA",
    },
    {
        city: "Kolkata",
        airport_name: "Netaji Subhas Chandra Bose International Airport",
        iata_code: "CCU",
    },
    {
        city: "Hyderabad",
        airport_name: "Rajiv Gandhi International Airport",
        iata_code: "HYD",
    },
    {
        city: "Kochi",
        airport_name: "Cochin International Airport",
        iata_code: "COK",
    },
    {
        city: "Ahmedabad",
        airport_name: "Sardar Vallabhbhai Patel International Airport",
        iata_code: "AMD",
    },
    {
        city: "Goa",
        airport_name: "Goa International Airport",
        iata_code: "GOI",
    },
    {
        city: "Pune",
        airport_name: "Pune Airport",
        iata_code: "PNQ",
    },
    {
        city: "Jaipur",
        airport_name: "Jaipur International Airport",
        iata_code: "JAI",
    },
    {
        city: "Bengaluru",
        airport_name: "Bengaluru International Airport",
        iata_code: "BLR2"
    },
    {
        city: "Srinagar",
        airport_name: "Srinagar International Airport",
        iata_code: "SXR",
    },
    {
        city: "Ahmedabad",
        airport_name: "Ahmedabad International Airport",
        iata_code: "AMD2"
    },
    {
        city: "Kozhikode (Calicut)",
        airport_name: "Calicut International Airport",
        iata_code: "CCJ",
    },
    {
        city: "Amritsar",
        airport_name: "Amritsar International Airport",
        iata_code: "ATQ",
    },
    {
        city: "Thiruvananthapuram",
        airport_name: "Trivandrum International Airport",
        iata_code: "TRV",
    },
    {
        city: "Lucknow",
        airport_name: "Lucknow Chaudhary Charan Singh International Airport",
        iata_code: "LKO",
    },
    {
        city: "Bhopal",
        airport_name: "Bhopal Raja Bhoj Airport",
        iata_code: "BHO",
    },
    {
        city: "Guwahati",
        airport_name: "Guwahati Lokpriya Gopinath Bordoloi International Airport",
        iata_code: "GAU",
    },
    {
        city: "Visakhapatnam",
        airport_name: "Visakhapatnam Airport",
        iata_code: "VTZ",
    },
    {
        city: "Coimbatore",
        airport_name: "Coimbatore International Airport",
        iata_code: "CJB",
    },
    {
        city: "Varanasi",
        airport_name: "Varanasi Lal Bahadur Shastri Airport",
        iata_code: "VNS",
    },
    {
        city: "Thiruvananthapuram",
        airport_name: "Thiruvananthapuram International Airport",
        iata_code: "TRV2"
    },
    {
        city: "Nagpur",
        airport_name: "Nagpur Dr. Babasaheb Ambedkar International Airport",
        iata_code: "NAG",
    },
];

const Hero = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmit = async () => {
        try {
            const departureIATA = cities.find(
                (city) => city.city === departureCity
            )?.iata_code;
            const arrivalIATA = cities.find(
                (city) => city.city === arrivalCity
            )?.iata_code;

            if (!departureIATA || !arrivalIATA || !departureDate) {
                setError(
                    "Please select departure city, arrival city, and departure date."
                );
                return;
            }

            const data = {
                from_city: departureIATA,
                to_city: arrivalIATA,
                trip_type: "2",
                outbound_date: departureDate,
            };
            console.log(data);
            const response = await axios.post(
                `https://exploremate-pythoncode.onrender.com/flight-details`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(10);

            if (response.status >= 200 && response.status < 300) {
                setResponseData(response.data);
                console.log(response.data);
                setModalIsOpen(true); // Open the modal after successful response
            } else {
                setError(response.data.answer || "An error occurred.");
            }
        } catch (error) {
            console.error("Error fetching answer:", error);
            setError("An error occurred while fetching the answer.");
        }
        console.log(11);
    };


    return (
        <>
            <div className="bg-black/20 h-full">
                <div className="h-full flex justify-center items-center p-4 bg-primary/10">
                    <div className="container grid grid-cols-1 gap-4">
                        <div className="text-white">
                            <p data-aos="fade-up" className="text-sm">
                                Our Packages
                            </p>
                            <p
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="font-bold text-3xl"
                            >
                                Search Your Destination
                            </p>
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="space-y-4 bg-white rounded-md p-4 relative"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">
                                <div>
                                    <label htmlFor="departure-city" className="opacity-70">
                                        Departure City
                                    </label>
                                    <select
                                        name="departure-city"
                                        id="departure-city"
                                        className="w-full bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                                        value={departureCity}
                                        onChange={(e) => setDepartureCity(e.target.value)}
                                    >
                                        <option value="">Select Departure City</option>
                                        {cities.map((city) => (
                                            <option key={city.iata_code} value={city.city}>
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="arrival-city" className="opacity-70">
                                        Arrival City
                                    </label>
                                    <select
                                        name="arrival-city"
                                        id="arrival-city"
                                        className="w-full bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                                        value={arrivalCity}
                                        onChange={(e) => setArrivalCity(e.target.value)}
                                    >
                                        <option value="">Select Arrival City</option>
                                        {cities.map((city) => (
                                            <option key={city.iata_code} value={city.city}>
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="departure-date" className="opacity-70">
                                        Departure Date
                                    </label>

                                    <input
                                        type="date"
                                        name="departure-date"
                                        id="departure-date"
                                        className="w-full !placeholder-slate-400 bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white hover:scale-105 px-4 py-2 rounded-full duration-200  -bottom-5 left-1/2 -translate-x-1/2 absolute"
                            >
                                Search Now
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Flight Details Modal"
                    style={{
                        content: {
                            width: "80%",
                            height: "80%",
                            margin: "50px auto auto auto",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            overflow: "auto",
                        },
                    }}
                >
                    <div className="flex justify-end">
                        <button
                            className="text-gray-500 hover:text-gray-800 focus:outline-none pr-10"
                            onClick={() => setModalIsOpen(false)}
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 5L19 19M5 19L19 5"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
                    {responseData && responseData.length > 0 ? (
                        <>
                            {responseData.map((flight, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 rounded-md shadow-md mb-4"
                                >
                                    <p className="text-lg font-semibold mb-2">Flight {index + 1}</p>
                                    <p><span className="font-semibold">Departure Airport:</span> {flight["Departure Airport"]}</p>
                                    <p><span className="font-semibold">Departure Time:</span> {flight["Departure Time"]}</p>
                                    <p><span className="font-semibold">Arrival Airport:</span> {flight["Arrival Airport"]}</p>
                                    <p><span className="font-semibold">Arrival Time:</span> {flight["Arrival Time"]}</p>
                                    <p><span className="font-semibold">Duration (minutes):</span> {flight["Duration (minutes)"]}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <h1 className="text-3xl text-gray-600">
                                NO FLIGHTS AVAILABLE BETWEEN THESE TWO CITIES
                            </h1>
                        </div>
                    )}
                </Modal>

            </div>
        </>
    )
}

export default Hero;












