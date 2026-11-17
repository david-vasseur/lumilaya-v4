import DesktopMenu from './DesktopMenu';
import { items } from './items';
import MobileMenu from './MobileMenu';

function Nav() {


    return (
        <nav className="relative w-full">
            <div className="hidden md:block">
            <DesktopMenu items={items} />
            </div>
            <div className="md:hidden">
            <MobileMenu items={items} />
            </div>
        </nav>
    );

}

export default Nav;