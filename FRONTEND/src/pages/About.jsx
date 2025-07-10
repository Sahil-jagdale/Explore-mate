import BlogsComp from "../components//Blogs/BlogsComp";
import Location from "../components/Location/Location";

const About = () => {
    return (
        <>
            <div className="container pt-14">
                <div className="py-10">
                    <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
                        About us
                    </h1>
                    <p>Welcome to Exploremate, your ultimate travel companion for seamless
                        trip planning and unforgettable adventures!</p>
                    <br />
                    <p>
                        We understand the
                        challenges travelers face when trying to find the best deals on
                        flights, hotels, and activities. That's why we've created a
                        user-friendly platform that simplifies the planning process, saving
                        you time and effort. With Trip Planner, you can easily create and
                        customize your itinerary, compare flight prices from multiple
                        airlines, and collaborate with friends or family members to plan the
                        perfect trip. Our platform also provides personalized
                        recommendations for cuisine, activities, and hotels based on your
                        preferences, ensuring that every aspect of your journey is tailored
                        to your liking.
                    </p>
                    <br />
                    <p>
                        Whether you're a seasoned traveler or embarking on your first
                        adventure, Trip Planner is here to make your travel planning
                        experience smooth, efficient, and enjoyable. Join us today and start
                        planning your next unforgettable trip!
                    </p>
                </div>
            </div>
            <Location />
            <BlogsComp />
        </>
    );
};

export default About;
