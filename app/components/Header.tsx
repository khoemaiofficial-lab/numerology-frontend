import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
    return (
        <div className="p-6 grid grid-cols-2 lg:grid-cols-3 items-center">
            <Logo />
            <Navbar />
        </div>
    )
}
// flex p-6 items-center justify-between