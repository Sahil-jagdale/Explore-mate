const FlightListPage = (props) => {
    const flights = props?.location?.state?.flights || [];// Receive flight data from props
    console.log("flights:", flights);

    const FlightCard = ({ flight }) => {
        console.log("flight:", flight);
        const { arrivalAirport, arrivalTime, departureAirport, departureTime, duration, price } = flight;

        return (
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white shadow-lg rounded-lg overflow-hidden m-4">
                <div className="px-4 py-2">
                    <h2 className="text-gray-800 font-semibold text-lg">{arrivalAirport}</h2>
                    <p className="text-gray-600 text-sm mt-1">Arrival Time: {arrivalTime}</p>
                    <p className="text-gray-600 text-sm">Departure Airport: {departureAirport}</p>
                    <p className="text-gray-600 text-sm">Departure Time: {departureTime}</p>
                    <p className="text-gray-600 text-sm">Duration (minutes): {duration}</p>
                    <p className="text-gray-600 text-sm">Price (USD): {price}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Flight List</h1>
            <div className="flex flex-wrap justify-center">
                {flights && flights.map((flight, index) => (
                    <FlightCard key={index} flight={flight} />
                ))}
            </div>
        </div>
    );
};

export default FlightListPage;