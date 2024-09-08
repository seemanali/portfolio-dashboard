import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contact</h3>
          <p className="flex items-center">
            <Mail className="mr-2" /> yourname@example.com
          </p>
          <p className="flex items-center mt-2">
            <MapPin className="mr-2" /> Your City, Your Country
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Follow Me</h3>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <Linkedin />
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <Github />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <Twitter />
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul>
            <li>
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">About Me</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gray-400">Projects</Link>
            </li>
            <li>
              <Link to="/skills" className="hover:text-gray-400">Skills</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8">
        <p>© 2024 Your Name. All rights reserved.</p>
        <p>Designed by Your Name.</p>
      </div>
    </footer>
  );
}

export default Footer;
