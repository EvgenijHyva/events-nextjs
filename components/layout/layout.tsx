import MainHeader from './main-header';

interface LayoutProps {
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