interface ListItem {
	icon?: number | string;
	title: string;
	description: string;
}

interface RichText {
	text: string;
	classList: string[] | null;
};

interface PageCopyInterface {
	hero?: {
		h1: string | RichText[];
		h2: string | RichText[];
		buttons: {
			text: string;
			url: string | null;
			primary: boolean;
		}[];
	};
	services?: {
		title: string;
		services: ListItem[];
	};
	staff?: {
		title: string;
		cards?: ListItem[];
	};
	flow?: {
		title: string;
		steps: ListItem[];
	};
	banner?: {
		title: string;
		description: string;
		button: {
			text: string;
			url?: string;
		};
		image?: string;
	};
	proof?: {
		title: string;
		testimonials: {
			quote: string;
			title: string;
			role: string;
			company: string;
			url: URL | null;
		}[];
	};
}

export type {
	ListItem,
	RichText,
	PageCopyInterface
};
