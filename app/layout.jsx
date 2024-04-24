import React from 'react'
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Organization website",
  description: "An abstract organization website",
};

export default function RootLayout({children}) {
	return (
		<html lang="en" data-theme="garden">
			<body className={inter.className}>
				<header>
					<nav>
						<ul className="flex flex-row justify-evenly">
							<li>
								<Link href="/">
									Organization Website
								</Link>
							</li>
							<li>
								<Link href="/profile">
									Profile
								</Link>
							</li>
							<li>
								<Link href="/register">
									Register
								</Link>
							</li>
							<li>
								<Link href="/login">
									Login
								</Link>
							</li>
							<li>
								<Link href="/logout">
									Logout
								</Link>
							</li>
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}

