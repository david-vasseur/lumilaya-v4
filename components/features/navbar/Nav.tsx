import DesktopMenu from './DesktopMenu';
import { items } from './items';
import MobileMenu from './MobileMenu';

function Nav() {


    return (
        <nav className={`fixed top-0 left-0 right-0 z-50`}>
            <div className="hidden md:block">
                <DesktopMenu items={items} />
            </div> 
            <div className="md:hidden">
                <MobileMenu items={items} />
            </div>           
        </nav>
    )
}

export default Nav;