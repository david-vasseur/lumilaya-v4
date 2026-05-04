import React from 'react'
function DiscountBanner() {
    return (
        <div className="fixed top-0 left-0 w-full h-10 bg-pink-500 text-white flex items-center justify-center text-sm font-medium z-500">
            🎉 Pour la fête des mères -20% avec le code :
            <span className="font-bold ml-1">FETEDESMERES26</span>
        </div>
    )
}

export default DiscountBanner;