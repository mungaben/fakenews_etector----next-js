import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const NavBar = () => {
  const NavLinks = [
    {
      name: 'Predict',
      link: 'predict'
    },
    {
      name: 'History',
      link: '/History'
    },

  ]
  return (
    <nav className='sticky mt-0 top-0   w-screen max-w-xl flex justify-center flex-col   '>
      <div className='flex flex-row justify-between '>


        <div className=' flex justify-center items-center text-sm  '>
          <Link href={"/"}>
            {/* <Image alt="logo" src="/img/logo.png" priority  height={0} width={0} className=' object-contain object-center center main_image ' /> */}
            predict.spoton
          </Link>


        </div>
        <div className='flex justify-center'>
          {
            NavLinks.map((link, index) => (
              <Button key={index} className='' size="sm" variant="link" >
                <Link href={link.link}>
                  {link.name}
                </Link>
              </Button>
            ))
          }

        </div>
        <div className='flex justify-center'>
          <Button className='' size="sm" variant="link" >
            <Link href={"/"}>
              SignUp/Login
            </Link>
          </Button>
        </div>


      </div>
      <div className=' flex justify-center items-center'>
        <Separator className="my-3  bg-black rounded-xl  max-w-lg  flex justify-center items-center" />
      </div>


    </nav>
  )
}

export default NavBar