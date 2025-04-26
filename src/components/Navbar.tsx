import { FaSearch } from "react-icons/fa";

export default () => {
	return (
		<div className="flex p-8 w-full border-b border-b-orange-500 ">
			<nav className="ml-auto flex flex-row justify-between items-center w-full">
				<a href="/" className="text-4xl">
					JustFossa
				</a>
				<div className="flex flex-row gap-6 items-center">
					<a
						href="/posts"
						className="text-lg  hover:text-orange-500 cursor-pointer"
					>
						Posts
					</a>
					<a
						href="/tags"
						className="text-lg hover:text-orange-500 cursor-pointer"
					>
						Tags
					</a>
					<a
						href="/about"
						className="text-lg hover:text-orange-500 cursor-pointer"
					>
						About
					</a>
					<FaSearch className="text-lg text-white hover:text-orange-500 cursor-pointer" />
				</div>
			</nav>
		</div>
	);
};
