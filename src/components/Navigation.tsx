import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC<{ pages: Array<{ name: string; path: string }> }> = ({ pages }) => {
    return (
        <nav style={{ display: 'flex', gap: '1rem' }}>
        {pages
          .filter(page => page.name.toLowerCase() !== 'home')
          .map(page => (
            <Link key={page.name} to={page.path}>{page.name}</Link>
          ))}
          </nav>
    );
};

export default Navigation;