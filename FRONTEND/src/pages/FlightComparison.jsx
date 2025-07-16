import { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaExchangeAlt, FaPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
        iata_code: "BLR1",
    },
    {
        city: "Srinagar",
        airport_name: "Srinagar International Airport",
        iata_code: "SXR",
    },
    {
        city: "Ahmedabad",
        airport_name: "Ahmedabad International Airport",
        iata_code: "AMD1",
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
        iata_code: "TRV1",
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
        iata_code: "TRV",
    },
    {
        city: "Nagpur",
        airport_name: "Nagpur Dr. Babasaheb Ambedkar International Airport",
        iata_code: "NAG",
    },
];
const FlightComparison = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
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

            const response = await axios.post(
                `http://localhost:5001/flight-details`,
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
                setError(null);
                console.log(response.data);
                // Open the modal after successful response
                setModalIsOpen(true);
            } else {
                setError(response.data.answer || "An error occurred.");
            }
        } catch (error) {
            console.error("Error fetching answer:", error);
            setError("An error occurred while fetching the answer.");
        }
        setLoading(false);
        console.log(11);
    };

    const handleExchange = () => {
        // Swap the values of departureCity and arrivalCity
        const tempDepartureCity = departureCity;
        setDepartureCity(arrivalCity);
        setArrivalCity(tempDepartureCity);
    };
    return (
        <div className="container mx-auto mt-20 py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
                <FaPlane className="inline-block mr-2 animate-bounce" />
                Flight Price Comparison
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
                <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="border rounded p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                >
                    <option value="">From</option>
                    {cities.map((city) => (
                        <option key={city.iata_code} value={city.city}>{city.city}</option>
                    ))}
                </select>
                <FaExchangeAlt
                    onClick={handleExchange}
                    className="cursor-pointer text-2xl md:mx-2 hover:text-blue-500 transition-colors duration-300"
                />
                <select
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                    className="border rounded p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                >
                    <option value="">To</option>
                    {cities.map((city) => (
                        <option key={city.iata_code} value={city.city}>{city.city}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    placeholder="Date"
                    className="border rounded p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                />
                <motion.button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaSearch className="mr-2" /> Search
                </motion.button>
            </div>
            {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
            )}
            {loading && (
                <div className="flex justify-center">
                    <FaPlane className="text-5xl animate-spin" />
                </div>
            )}
            {responseData && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(responseData).map(([key, flight]) => (
                        <div key={key} className="border p-4 rounded shadow-md">
                            <img src={flight.airline_logo[0]} alt={flight.airline_name} className="mb-4" />
                            <h2 className="text-xl font-bold mb-2">{flight.airline_name}</h2>
                            <p className="mb-2">Flight Number: {flight.flight_number[0]}</p>
                            <p className="mb-2">Price: ₹{flight.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightComparison;