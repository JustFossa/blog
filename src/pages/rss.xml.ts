import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
	const posts = await getCollection("blog");
	const sortedPosts = posts.sort((a, b) => {
		const dateA = new Date(a.data.date);
		const dateB = new Date(b.data.date);

		if (dateA < dateB) return 1; // a is older than b
		if (dateA > dateB) return -1; // a is newer than b
		return 0; // a and b are the same
	});
	return rss({
		title: "Just Fossa's Blog",
		description: "A blog about web development and more",
		site: "https://blog.justfossa.lol",
		items: sortedPosts.map(({ slug, data }) => ({
			link: `posts/${slug}`,
			title: data.title,
			description: data.description,
			pubDate: new Date(data.date),
		})),
	});
}
