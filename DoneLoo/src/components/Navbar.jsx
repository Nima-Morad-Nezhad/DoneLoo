import React from "react";

function Navbar (){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return(<>
    <nav className="home-nav-main">  <h1 className="nav-logo">DoneLoo</h1>
   
     </nav>
  
    </>)
}

export default Navbar;