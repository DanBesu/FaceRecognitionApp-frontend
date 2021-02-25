import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './mental-health.png';

const Logo = () => {

    return(
        <div className='ma4, mt0, pa4'>
            <Tilt className="Tilt br2 shadow-2 pa2" options={{ max : 60 }} style={{ height: 175, width: 175 }} >
                <div className="Tilt-inner, pa3">  
                    <img style={{paddingTop: '5px'}} alt='logo' src = {brain}/>
                </div>
            </Tilt>
        </div>
        
    );

}

export default Logo;