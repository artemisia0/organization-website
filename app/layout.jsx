import React from 'react'
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from '@/app/ui/navLink'
import {userRole} from '@/app/lib/session'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Organization website",
  description: "An abstract organization website",
};

export default async function RootLayout({children}) {
	const role = await userRole()
	return (
		<html lang="en" data-theme="light">
			<body className={inter.className + " min-h-lvh bg-gradient-to-br from-rose-100 to-amber-100 "}>
				<header>
					<nav className="nav  shadow-xl p-3">
						<ul className="flex flex-row justify-evenly">
							<li key={1}>
								<NavLink href="/"
									className="font-black text-xl">
									MyOrganization123
								</NavLink>
							</li>
							{role &&
								<li key={2}>
									<NavLink href="/profile"
										className="font-bold text-md">
										Profile
									</NavLink>
								</li>
							}
							{!role &&
								<li key={4}>
									<NavLink href="/login"
										className="font-bold text-md">
										Login
									</NavLink>
								</li>
							}
							{!role &&
								<li key={3}>
									<NavLink href="/register"
										className="font-bold text-md">
										Register
									</NavLink>
								</li>
							}
							{role &&
								<li key={5}>
									<NavLink href="/logout"
										className="font-bold text-md">
										Logout
									</NavLink>
								</li>
							}
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}

