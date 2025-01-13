interface ListItem {
	icon?: number | string;
	title: string;
	description: string;
}

interface RichText {
	text: string;
	classList: string[] | null;
};

type TextWithRichTextSupport = string | RichText[];

interface PageCopyInterface {
	hero?: {
		h1: TextWithRichTextSupport;
		h2: TextWithRichTextSupport;
		buttons: {
			text: string;
			url: string | null;
			primary: boolean;
		}[];
	};
	services?: {
		title: TextWithRichTextSupport;
		services: ListItem[];
	};
	staff?: {
		title: TextWithRichTextSupport;
		cards?: ListItem[];
	};
	flow?: {
		title: TextWithRichTextSupport;
		steps: ListItem[];
	};
	banner?: {
		title: TextWithRichTextSupport;
		description: TextWithRichTextSupport;
		button: {
			text: string;
			url?: string;
		};
		image?: string;
	};
	proof?: {
		title: TextWithRichTextSupport;
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
	TextWithRichTextSupport,
	PageCopyInterface
};
