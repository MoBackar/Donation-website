import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from './shadcn/ui/navigation-menu';
import { TNavigationMenuTab } from '../types';
import React from 'react';
import { cn } from './shadcn/lib/utils';
// import { toast } from "react-toastify"; // Import if using react-toastify
import { ToastAction } from './shadcn/ui/toast';
import { toast } from './shadcn/ui/use-toast';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './shadcn/ui/breadcrumb';
import { Slash } from 'lucide-react';

export default function TopBar() {
	const navigate = useNavigate();
	const location = window.location.pathname;

	const [type, setType] = useState<string | null>(null);
	const [breadCrumb, setBreadCrumb] = useState<string[]>([]);
	const user = JSON.parse(localStorage.getItem('user') || '{}');

	const onLogout = () => {
		setType('');
		navigate('/');
		localStorage.removeItem('user');
		// Clear the toastShown flag when logging out
		sessionStorage.removeItem('toastShown');
	};
	// useEffect(() => {
	// 	setType(location.split('/')[1]);
	// 	if (type && type === 'donor' && location.includes('/donor')) {
	// 		const timer = setTimeout(() => {
	// 			const now = new Date();
	// 			const dateStr = now.toLocaleString('en-US', {
	// 				weekday: 'long',
	// 				year: 'numeric',
	// 				month: 'long',
	// 				day: 'numeric',
	// 				hour: '2-digit',
	// 				minute: '2-digit',
	// 				second: '2-digit',
	// 			});
	// 			toast({
	// 				title: 'Your Driver Has Arrived',
	// 				description: ` ${dateStr}`,
	// 				action: (
	// 					<ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
	// 				),
	// 			});
	// 		}, 5000); // 5 seconds timeout
	// 		return () => clearTimeout(timer);
	// 	} else if (
	// 		type &&
	// 		type === 'organisation' &&
	// 		location.includes('/organisation')
	// 	) {
	// 		const timer = setTimeout(() => {
	// 			const now = new Date();
	// 			const dateStr = now.toLocaleString('en-US', {
	// 				weekday: 'long',
	// 				year: 'numeric',
	// 				month: 'long',
	// 				day: 'numeric',
	// 				hour: '2-digit',
	// 				minute: '2-digit',
	// 				second: '2-digit',
	// 			});
	// 			toast({
	// 				title: 'Your Request Has Been Fulfilled',
	// 				description: ` ${dateStr}`,
	// 				action: (
	// 					<ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
	// 				),
	// 			});
	// 		}, 5000); // 5 seconds timeout
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [type, location]);

	useEffect(() => {
		setType(location.split('/')[1]);

		setBreadCrumb([breadCrumb[1], window.location.pathname]);

		// Check if the toast has already been shown in this session
		const toastShown = sessionStorage.getItem('toastShown');

		if (!toastShown) {
			if (
				(type === 'donor' && location.includes('/donor')) ||
				(type === 'organisation' && location.includes('/organisation'))
			) {
				const timer = setTimeout(() => {
					const now = new Date();
					const dateStr = now.toLocaleString('en-US', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					});

					let toastTitle;
					if (type === 'donor') {
						toastTitle = 'Your Driver Has Arrived';
					} else {
						toastTitle = 'Your Request Has Been Fulfilled';
					}
					toast({
						title: toastTitle,
						description: ` ${dateStr}`,
						action: (
							<ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
						),
					});

					// Set the toastShown flag to true for this session
					sessionStorage.setItem('toastShown', 'true');
				}, 5000); // 5 seconds timeout

				return () => clearTimeout(timer);
			}
		}
	}, [type, location]);

	const navigationMenu: TNavigationMenuTab[] = [
		{
			name: 'Home',
			key: 'home',
			href: `/${type}`,
		},
		{
			name: 'Views',
			key: 'admin',
			links: [
				{
					name: 'Registered Organizations',
					key: 'admin',
					href: '/admin/RegisteredOrganizations',
				},
				{
					name: 'Donor Requests',
					key: 'admin',
					href: '/admin/DonorRequests',
				},
				{
					name: 'Organization Requests',
					key: 'admin',
					href: '/admin/OrganizationsRequests',
				},
				{
					name: 'Account Settings',
					key: 'admin',
					href: '/admin/AccountSettings',
				},
			],
		},
		{
			name: 'Organisation',
			key: 'donor-org',
			links: [
				{
					name: 'Medical Cases',
					key: 'doctor',
					href: '/donor/medical-cases',
				},
				{
					name: 'Teaching Posts',
					key: 'teacher',
					href: '/donor/teaching',
				},
				{
					name: 'Organizations',
					key: 'all',
					href: '/donor/organizations',
				},
			],
		},
		{
			name: 'Donations',
			key: 'donor-donation',
			links: [
				{
					name: 'Toys',
					key: 'all',
					href: '/donor/toys',
				},
				{
					name: 'Clothes',
					key: 'all',
					href: '/donor/clothes',
				},
				{
					name: 'Food',
					key: 'all',
					href: '/donor/food',
				},
				{
					name: 'Medicines Supplies',
					key: 'all',
					href: '/donor/medical-supplies',
				},
				{
					name: 'School Supplies',
					key: 'all',
					href: '/donor/school-supplies',
				},
				{
					name: 'Blood',
					key: 'all',
					href: '/donor/blood-donation',
				},
			],
		},
		{
			name: 'Organisation',
			key: 'organisation',
			links: [
				{
					name: 'Fulfilled Posts',
					key: 'fulfilled',
					href: '/organisation/fulfilled-posts',
				},
				{
					name: 'Unfulfilled Posts',
					key: 'unfulfilled',
					href: '/organisation/unfulfilled-posts',
				},
				{
					name: 'Notifications',
					key: 'notifications',
					href: '/organisation/notifications',
				},
			],
		},
		{
			name: 'Settings',
			key: 'settings',
			href: `/${type}/settings`,
		},
		{
			name: 'Logout',
			key: 'logout',
			href: '/',
		},
	];

	const currentLocation =
		window.location.pathname.split('/')[
			window.location.pathname?.split('/').length - 1
		];
	const previousLocation =
		breadCrumb[0]?.split('/')[breadCrumb[0]?.split('/').length - 1];

	const currentLocationCapitalized =
		currentLocation.charAt(0)?.toUpperCase() + currentLocation.slice(1);
	const previousLocationCapitalized =
		previousLocation?.charAt(0)?.toUpperCase() + previousLocation?.slice(1);
	const isSameLocation = currentLocation === previousLocation;

	return type != 'register' && type != '' ? (
		<div className="sticky left-0 top-0 z-20 h-16 w-full flex items-center justify-between px-4  p-3 transition-shadow bg-primary shadow-md">
			<div className="flex items-center gap-4">
				<h1 className="text-3xl font-bold text-white">{type} Portal</h1>
			</div>
			<NavigationMenu className="justify-self-center">
				<NavigationMenuList>
					{navigationMenu.map((tab) =>
						tab.key.split('-')[0] === type ||
						tab.key === 'logout' ||
						tab.key === 'home' ||
						tab.key === 'settings' ? (
							<NavigationMenuItem key={tab.key}>
								{tab.links ? (
									<>
										<NavigationMenuTrigger>{tab.name}</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-96 p-2 md:grid-cols-2 lg:w-[600px]">
												{tab.links.map((link) =>
													['regular', 'doctor', 'teacher'].includes(
														user.donorType
													) ? (
														link.key === 'all' ? (
															<ListItem
																key={link.key}
																title={link.name}
																href={link.href}
															>
																{link.name}
															</ListItem>
														) : link.key === user.donorType ? (
															<ListItem
																key={link.key}
																title={link.name}
																href={link.href}
															>
																{link.name}
															</ListItem>
														) : null
													) : (
														<ListItem
															key={link.key}
															title={link.name}
															href={link.href}
														>
															{link.name}
														</ListItem>
													)
												)}
											</ul>
										</NavigationMenuContent>
									</>
								) : (
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
										onClick={() => {
											if (tab.href !== undefined) {
												if (tab.name === 'Logout') {
													onLogout();
												} else {
													navigate(tab.href);
												}
											}
										}}
									>
										<button
											onClick={() => {
												if (tab.href !== undefined) {
													if (tab.name === 'Logout') {
														onLogout();
													} else {
														navigate(tab.href);
													}
												}
											}}
											className=""
										>
											{tab.name}
										</button>
									</NavigationMenuLink>
								)}
							</NavigationMenuItem>
						) : null
					)}
				</NavigationMenuList>
			</NavigationMenu>
			<Breadcrumb>
				{!isSameLocation ? (
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={breadCrumb[0]}>
								{previousLocationCapitalized}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>{currentLocationCapitalized}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				) : (
					<div className="w-36" />
				)}
			</Breadcrumb>
		</div>
	) : null;
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';
