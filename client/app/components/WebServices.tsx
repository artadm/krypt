import React, { ReactElement, ReactNode } from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'


const ServiceCard = ({color, title, subtitle, icon}: {color: string, subtitle: string, title: string, icon: ReactElement}) => {
	return (
		<div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
			<div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
					{icon}
			</div>
			<div className="ml-5 flex flex-col flex-1">
				<h3 className='mt-2 text-white text-lg'>{title}</h3>
				<p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
			</div>
		</div>
	)
}

const WebServices = () => {
	return (
		<div className='flex flex-col md:flex-row w-full justify-center gradient-bg-services items-center'>
			<div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
				<div className="flex-1 flex flex-col justify-start items-center">
					<h1 className='text-3xl sm:text-5xl text-white py-2 text-gradient'>
						Services that we
						<br />
						continue to improve
					</h1>
				</div>
			</div>
			<div className="flex-1 flex-col flex justify-start items-center">
				<ServiceCard 
				color="bg-[#2952E3]" 
				title="Security Guaranteed" 
				icon={<BsShieldFillCheck fontSize={21} className='text-white'/>} 
				subtitle="Security is guaranteed, we always maintain quality and privacy of our products"/>
				<ServiceCard 
				color="bg-[#8945F8]" 
				title="Best Exchange Rates" 
				icon={<BiSearchAlt fontSize={21} className='text-white'/>} 
				subtitle="Security is guaranteed, we always maintain quality and privacy of our products"/>
				<ServiceCard 
				color="bg-[#F84550]" 
				title="Fastest Transactions" 
				icon={<RiHeart2Fill fontSize={21} className='text-white'/>} 
				subtitle="Security is guaranteed, we always maintain quality and privacy of our products"/>
			</div>
		</div>
	)
}

export default WebServices