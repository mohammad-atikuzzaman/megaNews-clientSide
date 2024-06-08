import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 divide-y my-4 bg-gray-800 text-gray-100">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            href="/"
            className="flex justify-center space-x-3 lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 rounded-full ">
              <img
                src="https://i.ibb.co/wRrnxfH/Default-Create-a-logo-for-Mega-News-a-news-portal-emphasizing-1-removebg-preview.png"
                alt="mega news logo"
              />
            </div>
            <span className="self-center text-2xl font-semibold">
              Mega News
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-gray-50">Product</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Features
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Integrations
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-gray-50">Company</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase text-gray-50">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase text-gray-50">Social media</div>
            <div className="flex justify-start space-x-3 text-2xl">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                title="Facebook"
                className="flex items-center p-1">
                <FaFacebook></FaFacebook>
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                title="Twitter"
                className="flex items-center p-1">
                <FaTwitter></FaTwitter>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                title="Instagram"
                className="flex items-center p-1">
                <FaInstagram></FaInstagram>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center text-gray-400">
        © Mega Newsa co ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
