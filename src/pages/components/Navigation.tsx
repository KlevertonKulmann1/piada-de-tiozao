import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import your page components here
import Home from '../Home';
import About from '../About';
import Jokes from '../Jokes';

const pageComponents: { [key: string]: React.ComponentType } = {
    Home,
    About,
    Jokes,
};

const Navigation: React.FC<{ pages: Array<{ name: string; path: string }> }> = ({ pages }) => {
    return (
        <Routes>
            {pages.map(page => {
                const Component = pageComponents[page.name];
                return (
                    <Route key={page.name} path={page.path} element={Component ? <Component /> : null} />
                );
            })}
        </Routes>
    );
};

export default Navigation;