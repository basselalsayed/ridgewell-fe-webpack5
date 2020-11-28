import { useState } from 'react';

import { menu, menuBtn, open, menuBtnBurger } from './burger.module.css';

const Burger = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flex: 10, flexDirection: 'row' }}>
      <div className={[menuBtn, isOpen ? open : ''].join(' ')}>
        <div onClick={() => setisOpen(!isOpen)} className={menuBtnBurger} />
        {isOpen && (
          <div className={menu}>
            <ul>
              <li>Hi</li>
              <li>Hello</li>
              <li>Howdy</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { Burger };
