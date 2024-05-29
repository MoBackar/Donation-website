import { Card } from './shadcn/ui/card';
import {
	bloodCases,
	clothes,
	foods,
	medicalCases,
	medicalSupplies,
	orgPosts,
	organizations,
	schoolSupplies,
	teachingPosts,
	toys,
} from '../assets/dummyData';
import {
	bloodFilterOptions,
	clothesFilterOptions,
	foodsFilterOptions,
	medicalSuppliesFilterOptions,
	schoolSuppliesFilterOptions,
	toysFilterOptions,
	TeachingPostsOptions,
	medicalCasesFilterOptions,
	RegisteredOrganizationsOptions,
} from '../assets/filterOptions';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import { useEffect, useState } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from './shadcn/ui/pagination';

export default function ViewList({
	category,
	Cardbody,
}: {
	category: string;
	Cardbody: (props: any) => JSX.Element;
}) {
	const pageSize = 9; // Number of items per page
	const [data, setData] = useState<any[]>([]);
	const [page, setPage] = useState(0);

	const location = window.location.pathname.split('/');
	const [user, setType] = useState<string | null>(null);

	useEffect(() => {
		setType(location[1]);
	}, [location]);

	const nav = useNavigate();
	const CardClickDonor = (item: any) => {
		nav(`/donor/${window.location.pathname.split('/')[2]}/${item.id}`);
	};
	const CardClickOrg = (item: any) => {
		nav(`/organisation/${window.location.pathname.split('/')[2]}/${item.id}`);
	};

	let items: any[] = [];
	let filterOptions: any[] = [];

	switch (category) {
		case 'Clothes':
			items = clothes;
			filterOptions = clothesFilterOptions;
			break;
		case 'Toys':
			items = toys;
			filterOptions = toysFilterOptions;
			break;
		case 'Food':
			items = foods;
			filterOptions = foodsFilterOptions;
			break;
		case 'Medical Supplies':
			items = medicalSupplies;
			filterOptions = medicalSuppliesFilterOptions;
			break;
		case 'School Supplies':
			items = schoolSupplies;
			filterOptions = schoolSuppliesFilterOptions;
			break;
		case 'Blood Donation':
			items = bloodCases;
			filterOptions = bloodFilterOptions;
			break;
		case 'Medical Cases':
			items = medicalCases;
			filterOptions = medicalCasesFilterOptions;
			break;
		case 'TeachingPosts':
			items = teachingPosts;
			filterOptions = TeachingPostsOptions;
			break;
		case 'Organizations':
			items = organizations.filter((org) => org.status === 'approved');
			filterOptions = RegisteredOrganizationsOptions;
			break;
		case 'Fulfilled-Posts':
			items = orgPosts.filter((org) => org.condition === true);
			filterOptions = [
				...bloodFilterOptions,
				...clothesFilterOptions,
				...foodsFilterOptions,
				...medicalSuppliesFilterOptions,
				...schoolSuppliesFilterOptions,
				...toysFilterOptions,
			];
			break;
		case 'UnFulfilled-Posts':
			items = orgPosts.filter((org) => org.condition === false);
			filterOptions = [
				...bloodFilterOptions,
				...clothesFilterOptions,
				...foodsFilterOptions,
				...medicalSuppliesFilterOptions,
				...schoolSuppliesFilterOptions,
				...toysFilterOptions,
			];
			break;
		default:
			items = [
				...bloodCases,
				...clothes,
				...foods,
				...medicalSupplies,
				...schoolSupplies,
				...toys,
			];
			filterOptions = [
				...bloodFilterOptions,
				...clothesFilterOptions,
				...foodsFilterOptions,
				...medicalSuppliesFilterOptions,
				...schoolSuppliesFilterOptions,
				...toysFilterOptions,
			];
			break;
	}

	const onPageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div className="flex h-full w-full">
			<Filter
				setData={setData}
				dummyData={items}
				columnFilters={filterOptions}
				searchColumn="name"
			/>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<div className="p-2">
						<h1 className="text-3xl font-bold text-center">{category}</h1>
					</div>
					<div className="p-2">
						<Pagination>
							<PaginationContent>
								<PaginationItem className="flex self-start">
									<PaginationPrevious
										onClick={() => {
											if (page > 0) {
												onPageChange(page - 1);
											}
										}}
										aria-disabled={page === 0}
										className={`select-none bg-accent-700 ${page === 0 ? 'pointer-events- opacity-50' : ''}`}
									/>
								</PaginationItem>
								<PaginationItem className="flex self-end">
									<PaginationNext
										onClick={() => {
											if (data.slice((page + 1) * pageSize).length !== 0) {
												onPageChange(page + 1);
											}
										}}
										className={`select-none bg-accent-700 ${data.slice((page + 1) * pageSize).length === 0 ? 'pointer-events- opacity-50' : ''}`}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2 p-2 py-4 w-[80vw] h-[80vh] grid-flow-dense">
					{data
						.slice(page * pageSize, (page + 1) * pageSize)
						.map((item, index) => (
							<Card
								key={`${item.id}-${index}`}
								className="flex flex-row object-contain w-100 h-52 text-nowrap cursor-pointer bg-primary-800"
								onClick={() => {
									if (user === 'organisation') CardClickOrg(item);
									else CardClickDonor(item);
								}}
							>
								<Cardbody {...item} />
							</Card>
						))}
				</div>
			</div>
		</div>
	);
}
