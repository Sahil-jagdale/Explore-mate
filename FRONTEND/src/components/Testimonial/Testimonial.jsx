import Slider from "react-slick";

const testimonialData = [
    {
        id: 1,
        name: "Sahil Jagdale",

        img: "https://picsum.photos/101/101",
    },
    {
        id: 2,
        name: "Shravan Bobade",

        img: "https://picsum.photos/102/102",
    },
    {
        id: 3,
        name: "Vaidehi Bagale",

        img: "https://picsum.photos/103/103",
    },
    {
        id: 4,
        name: "Tejveer Singh",

        img: "https://picsum.photos/104/104",
    },
];

const Testimonial = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10 px-24">
                <div className="container">
                    {/* Header section */}
                    <div className="text-center mb-20 max-w-[400px] mx-auto">
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-teal-400">
                            Testimonial
                        </p>
                        <h1 className="text-3xl font-bold">Testimonial</h1>
                        <p className="text-xs text-gray-400">
                            {" "}

                        </p>
                    </div>
                    {/* testimonial section */}
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="300"
                        className="grid grid-cols-1 max-w-[800px] mx-auto gap-6"
                    >
                        <Slider {...settings}>
                            {testimonialData.map(({ id, name, text, img }) => {
                                return (
                                    <div key={id} className="my-6">
                                        <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-[#0287a8]/10 relative">
                                            <img
                                                src={img}
                                                alt=""
                                                className="rounded-full block mx-auto"
                                            />
                                            <h1 className="text-xl font-bold">{name}</h1>
                                            <p className="text-gray-500 text-sm">{text}</p>
                                            <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                                                ,,
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;