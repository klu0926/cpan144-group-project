import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./contexts/FavoritesContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "CPAN114 - Spoonacular API",
	description: "A nice little Spoonacular API APP to find new recipes, save them, and view them for cooking!",
};

export default function RootLayout({ children }) {
	return (
		<FavoritesProvider>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
			</html>
		</FavoritesProvider>
	);
}
