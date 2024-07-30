import React from "react";

const Contact = () => {
  return (
    <div className=" mt-[100px]">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Our vision </h1>
          <p className="text-sm text-gray-400 mt-3">
            create a vibrant community where photographers can showcase their
            work and buyers can find the perfect photos for their needs. We aim
            to make the buying and selling of photos as easy and enjoyable as
            possible.
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 479.058 479.058"
                  >
                    <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                  </svg>
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://veilmail.io/e/FkKh7o"
                  className="text-[#007bff] text-sm ml-3"
                >
                  <small className="block">Mail</small>
                  <strong>https://picworld@gmail.com</strong>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z" />
                  </svg>
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 511 512"
                  >
                    <path d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.735-16.726 45.305-25.793 71.84-25.793 62.846 0 113.524 50.68 113.524 113.52zm0 0" />
                  </svg>
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-.003v-.003H20.447z" />
                    <path d="M20.452 20.452h.002V15.3c0-2.607-.56-4.62-3.573-4.62-1.45 0-2.423.792-2.82 1.543h-.038v-1.327h-2.37v9.558h2.47v-4.728c0-1.244.237-2.447 1.778-2.447 1.515 0 1.54 1.42 1.54 2.52v4.655zm-11.55-9.558H6.431v9.558H8.9zm-1.234-5.545c-.825 0-1.49.667-1.49 1.488 0 .82.665 1.49 1.49 1.49.823 0 1.49-.67 1.49-1.49s-.667-1.487-1.49-1.487zm14.335 14.717h-21a.75.75 0 0 1-.75-.75v-21c0-.414.336-.75.75-.75h21a.75.75 0 0 1 .75.75v21a.75.75 0 0 1-.75.75zm-.75-21h-19.5v19.5h19.5zm-7.146 2.028h-.001h.001z" />
                  </svg>
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 32 32"
                  >
                    <path d="M32 6.078a13.174 13.174 0 0 1-3.773 1.034 6.595 6.595 0 0 0 2.887-3.634 13.16 13.16 0 0 1-4.169 1.592 6.563 6.563 0 0 0-4.798-2.078 6.574 6.574 0 0 0-6.572 6.572c0 .516.061 1.019.17 1.504A18.653 18.653 0 0 1 2.228 4.62 6.547 6.547 0 0 0 1.356 8.56a6.55 6.55 0 0 0 2.921 5.464A6.528 6.528 0 0 1 1.28 13.5v.082a6.578 6.578 0 0 0 5.274 6.446 6.588 6.588 0 0 1-2.96.113 6.576 6.576 0 0 0 6.138 4.56 13.183 13.183 0 0 1-8.151 2.808c-.529 0-1.052-.032-1.566-.092A18.588 18.588 0 0 0 10.07 28c12.072 0 18.672-10.002 18.672-18.671 0-.284-.008-.568-.02-.85A13.328 13.328 0 0 0 32 6.078z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          id="form"
          className="w-full"
        >
          <input type="hidden" name="access_key" value="your-access-key-here" />
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-3 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all duration-300"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all duration-300"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-bold">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="w-full p-3 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all duration-300"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-bold">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              className="w-full p-3 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all duration-300"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#007bff] text-white font-bold rounded focus:outline-none hover:bg-blue-700 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
