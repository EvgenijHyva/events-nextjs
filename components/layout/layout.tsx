import MainHeader from './main-header';

export interface LayoutProps {
	children: JSX.Element
}

export default function Layout(props: LayoutProps) {
	return <>
		<MainHeader />
		<main>
			{props.children}
		</main >
	</>;
}