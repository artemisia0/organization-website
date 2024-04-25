import React from 'react'
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from '@/app/ui/navLink'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Organization website",
  description: "An abstract organization website",
};

export default function RootLayout({children}) {
	return (
		<html lang="en" data-theme="retro">
			<body className={inter.className}>
				<header>
					<nav className="nav bg-base-200 shadow-xl p-3">
						<ul className="flex flex-row justify-evenly">
							<li>
								<NavLink href="/">
									<div className="font-black text-2xl">
										Organization Website
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink href="/profile">
									<div className="font-bold text-lg">
										Profile
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink href="/register">
									<div className="font-bold text-lg">
										Register
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink href="/login">
									<div className="font-bold text-lg">
										Login
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink href="/logout">
									<div className="font-bold text-lg">
										Logout
									</div>
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}

