import { useState } from "react";
import header from './layout.module.css';

const Header = () => {

    const [keyword, setKeyword] = useState('');

    return(
        <div className={header.header}>
            <div className={header.searchbar}>
                <span className={header.searchIcon}>🔎</span>
                <input type="text" placeholder="Search here..." value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            </div>
        </div>
    );
};

export default Header;