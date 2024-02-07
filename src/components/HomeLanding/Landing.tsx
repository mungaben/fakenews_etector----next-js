import React from 'react'

const Landing = () => {
    return (
        <div className=' max-w-6xl'>
            <div>
                <h1 className=' flex justify-center items-center font-extrabold lg:text-3xl md:text-3xl sm:text-xl text-sm  '>
                    <strong className=' tracking-wider leading-10 font-mono'>
                        Connect. Learn. Earn
                    </strong>
                </h1>
                <p className=' font-thin text-sm  text-center max-w-sm subpixel-antialiased md:text-balance'>
                    <span>
                        Our smart system sniffs out shady news! We use the newest tools to check sources, scan other reports, and expose phonies. Forget fake.
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Landing