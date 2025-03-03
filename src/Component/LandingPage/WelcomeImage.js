import React from "react";
import WelcomeBackImage from '../../Asset/Icons/WelcomeImage.svg';
import SprilOne from '../../Asset/Icons/SprilOne.svg';
import SprilTwo from '../../Asset/Icons/SprilTwo.svg';

const WelcomeImage = () => {
  return (
    <div className="relative flex justify-center items-center w-full overflow-hidden">
      <div className="container mx-auto px-4">

        <img 
          src={WelcomeBackImage} 
          alt="Welcome Back"
          className="w-full max-w-[1050px] h-auto object-contain mx-auto"
        />
      </div>
      <img 
        src={SprilOne} 
        alt="Spiral One"
        className="absolute hidden lg:block w-[100px] left-0 top-[620px]"
      />

      <img 
        src={SprilTwo} 
        alt="Spiral Two"
        className="absolute hidden lg:block w-[100px] right-0 top-[90px]"
      />
    </div>
  );
};

export default WelcomeImage;
