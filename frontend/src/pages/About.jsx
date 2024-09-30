import React from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            amet ullam facere suscipit impedit ab distinctio blanditiis sit.
            Itaque doloremque atque earum reprehenderit ipsam sit est dicta
            animi illo ad hic, error, magnam vel enim ducimus corrupti et ipsa
            sapiente quia, dolor iure tempore. Asperiores, sit sunt. Provident,
            eligendi nobis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            amet ullam facere suscipit impedit ab distinctio blanditiis sit.
            Itaque doloremque atque earum reprehenderit ipsam sit est dicta
            animi illo ad hic, error, magnam vel enim ducimus corrupti et ipsa
            sapiente quia, dolor iure tempore. Asperiores, sit sunt. Provident,
            eligendi nobis!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            maxime ea ad reiciendis temporibus doloribus facere vitae quis quo
            voluptate repellat quaerat provident, laudantium, aspernatur
            recusandae numquam debitis rerum earum!
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quis dicta cumque nemo cum eum perspiciatis voluptatum beatae natus totam reprehenderit, quaerat accusamus asperiores esse.</p>
          </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quis dicta cumque nemo cum eum perspiciatis voluptatum beatae natus totam reprehenderit, quaerat accusamus asperiores esse.</p>
          </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quis dicta cumque nemo cum eum perspiciatis voluptatum beatae natus totam reprehenderit, quaerat accusamus asperiores esse.</p>
          </div>
      </div>

      <NewsLetterBox/>
    </div>
  );
}

export default About;
