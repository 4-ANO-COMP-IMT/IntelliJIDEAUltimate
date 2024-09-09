import React from 'react';

const SocialMediaLinks: React.FC = () => {
    return (
        <div className="d-flex justify-content-center text-center mt-4 pt-1">
            <a href="#!" className="text-white">
                <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#!" className="text-white mx-4 px-2">
                <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#!" className="text-white">
                <i className="fab fa-google fa-lg"></i>
            </a>
        </div>
    );
};

export default SocialMediaLinks;