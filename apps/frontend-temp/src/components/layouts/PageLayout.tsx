import NavbarComponent from 'components/Header/Navbar';
import React, { PropsWithChildren } from 'react'

const PageLayout: React.FC = ({children}:PropsWithChildren) => {

  
    return (
        <>
            <NavbarComponent handleShow={()=>{}}></NavbarComponent>
            {children}
        </>
    );
  };
  
  export default PageLayout;
  