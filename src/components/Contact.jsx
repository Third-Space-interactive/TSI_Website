import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import AnimatedTitle from "./AnimatedTitle";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass} >
    <img src={src} />
  </div>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Third Space Interactive',
        from_email: form.email,
        to_email: 'thirdspaceinteractive@gmail.com', // Replace with your actual email
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false);
        alert('Thank you. We will get back to you as soon as possible');
        setForm({
          name: '',
          email: '',
          message: '',
        });
      }, 
      (error) => {
        setLoading(false);
        console.log(error);
        alert('Something went wrong. Please try again.');
      }
    );
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Background Images */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox 
            src="/img/about.png"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/entrance.png"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 semi-transparent-element">
          <ImageClipBox
            src="/img/logo.png"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/logo.png"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-10 font-general text-[10px] uppercase">
            Work with Third Space Interactive
          </p>

          <AnimatedTitle
            title="Together, we can <br/> turn ideas <br/> into Reality."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] mb-10 !sm:text-[4.2rem]"
          />

          {/* Contact Form */}
          <div className="w-full max-w-2xl mx-auto px-6 mt-20">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-blue-50 font-medium text-left">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="bg-light py-4 px-6 placeholder:text-gray-400 text-black rounded-lg outline-none border-none font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-blue-50 font-medium text-left">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  className="bg-light py-4 px-6 placeholder:text-gray-400 text-black rounded-lg outline-none border-none font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-blue-50 font-medium text-left">
                  Your Message
                </label>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  className="bg-light py-4 px-6 placeholder:text-gray-400 text-black rounded-lg outline-none border-none font-medium resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-blue-500/50 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;