import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 TechSecondLife. Alle Rechte vorbehalten.</p>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Datenschutz</a></li>
            <li><a href="#" className="hover:text-gray-300">AGB</a></li>
            <li><a href="#" className="hover:text-gray-300">Kontakt</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}