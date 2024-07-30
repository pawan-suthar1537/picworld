import React from "react";

const About = () => {
  return (
    <div className="mt-[60px] p-6 text-left">
      <h1 className="text-3xl text-center font-bold mb-4 my-5">
        About This Project
      </h1>
      <p className="text-lg mb-4">
        Welcome to our Photo Marketplace, a platform where creativity meets
        commerce. This project is designed to connect photographers and photo
        enthusiasts, providing a seamless experience for both sellers and
        buyers.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Users can log in as either a seller or a buyer.</li>
        <li>Sellers can upload and manage their photos for sale.</li>
        <li>Buyers can browse, purchase, and download photos.</li>
        <li>Integrated with Razorpay for secure and smooth transactions.</li>
        <li>Both sellers and buyers have their dedicated dashboards.</li>
        <li>Users can switch between seller and buyer roles anytime.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
      <p className="text-lg mb-4">
        Our platform is built using modern web technologies to ensure a robust
        and scalable application. Some of the key technologies include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>React for building the user interface.</li>
        <li>Redux for state management.</li>
        <li>Axios for handling API requests.</li>
        <li>Tailwind CSS for styling.</li>
        <li>Razorpay for payment processing.</li>
        <li>Node.js and Express for the backend.</li>
        <li>MongoDB for the database.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
      <p className="text-lg">
        Our vision is to create a vibrant community where photographers can
        showcase their work and buyers can find the perfect photos for their
        needs. We aim to make the buying and selling of photos as easy and
        enjoyable as possible.
      </p>
    </div>
  );
};

export default About;
