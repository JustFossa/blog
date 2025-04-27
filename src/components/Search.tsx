import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import React, { useEffect, useState, useMemo } from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import BlogItem from "./BlogItem.astro";

interface SearchItem {
	title: string;
	slug: string;
	description: string;
	data: CollectionEntry<"blog">["data"];
}
interface Props {
	searchList: SearchItem[];
}

export const SearchBar = ({ searchList }: Props) => {
	const [val, setVal] = useState("");
	const [results, setResults] = useState<SearchItem[] | null>(null);

	const fuse = useMemo(
		() =>
			new Fuse(searchList, {
				keys: ["title", "description"],
				threshold: 0.4,
				ignoreLocation: true,
				minMatchCharLength: 2,
			}),
		[searchList]
	);

	useEffect(() => {
		const searchUrl = new URL(window.location.href);
		const searchParam = searchUrl.searchParams.get("q");

		console.log(searchList);

		if (searchParam) {
			setVal(searchParam);
		}
	}, []);

	useEffect(() => {
		let inputResult = val.length > 1 ? fuse.search(val) : [];
		setResults(inputResult.map((item) => item.item));

		console.log(inputResult);

		if (val.length > 0) {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set("q", val);
			const newRelativPathQuery = `${
				window.location.pathname
			}?${searchParams.toString()}`;
			window.history.replaceState(history.state, "", newRelativPathQuery);
		} else {
			history.replaceState(history.state, "", window.location.pathname);
		}
	}, [val]);

	return (
		<div className="flex flex-col gap-2">
			<input
				type="text"
				value={val}
				onChange={(e) => setVal(e.target.value)}
				placeholder="Search for anything..."
				className="border border-gray-300 rounded p-3 focus:outline-none focus:border-orange-500"
			/>
			{results && results.length > 0 && (
				<div className="flex flex-col gap-2 mt-5">
					<p className="italic">
						Found {results.length} results for '{val}'
					</p>
					{results.map((item) => {
						const formattedDate =
							Intl.DateTimeFormat(`en-US`, {
								dateStyle: `long`,
							}).format(new Date(item.data.date)) +
							` | ${Intl.DateTimeFormat(`en-US`, {
								timeStyle: `short`,
							}).format(new Date(item.data.date))}`;
						return (
							<div key={item.slug} className="flex flex-col gap-2">
								<a
									href={`/posts/${item.slug}`}
									className="text-xl w-fit text-orange-500 hover:border-dashed inline-block cursor-pointer border-b-2 hover:border-b-orange-500 border-b-transparent"
								>
									{item.title}
								</a>
								<p className="text-gray-500 italic flex flex-row items-center gap-3">
									<FaRegCalendarAlt />
									{formattedDate}
								</p>
								<p className="font-medium cursor-default">{item.description}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
