
const Location = () => {
    return (
        <>
            <span id="location"></span>
            <section data-aos="fade-up" className="">
                <div className="container my-4">
                    <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
                        Location to visit
                    </h1>

                    <div className="rounded-xl ">
                        <iframe
                            // src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9948.014721545012!2d72.8620362894475!3d19.0246582409061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1713007978922!5m2!1sen!2sin"
                            //<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9948.014721545012!2d72.8620362894475!3d19.0246582409061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1713007978922!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            // <src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9948.014721545012!2d72.8620362894475!3d19.0246582409061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf26f4972d21%3A0x2c50185364aca4c1!2sVeermata%20Jijabai%20Technological%20Institute!5e0!3m2!1sen!2sin!4v1713007799216!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></src=>
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9948.014721545012!2d72.8620362894475!3d19.0246582409061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf26f4972d21%3A0x2c50185364aca4c1!2sVeermata%20Jijabai%20Technological%20Institute!5e0!3m2!1sen!2sin!4v1713007799216!5m2!1sen!2sin"
                            width="100%"
                            height="360"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            style={{ borderRadius: "20px" }}
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Location;


// import React, { useState, useEffect } from "react";

// const Location = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   useEffect(() => {
//     const getLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setLatitude(position.coords.latitude);
//             setLongitude(position.coords.longitude);
//           },
//           (error) => {
//             console.error("Error getting user location:", error);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//     };

//     getLocation();
//   }, []);

//   return (
//     <>
//       {latitude && longitude && (
//         <div>
//           <p>Latitude: {latitude}</p>
//           <p>Longitude: {longitude}</p>
//         </div>
//       )}
//       <section data-aos="fade-up" className="">
//         <div className="container my-4">
//           <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
//             Location to visit
//           </h1>

//           <div className="rounded-xl">
//             <iframe
//               src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9948.014721545012!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1713007978922!5m2!1sen!2sin`}
//               width="100%"
//               height="360"
//               allowfullscreen=""
//               loading="lazy"
//               referrerpolicy="no-referrer-when-downgrade"
//               style={{ borderRadius: "20px" }}
//             ></iframe>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Location;