import { PlusCircle, MinusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import DropDownMenuFilter from './DropDownMenuFilter';
import Searchbar from './Searchbar';

export default function Filter({
	columnFilters,
	dummyData,
	setData,
	searchColumn,
	hidesearchbar,
}: {
	columnFilters: {
		id: string;
		label: string;
		type: 'string' | 'number' | 'boolean' | 'options';
		options?: { value: string; label: string }[];
	}[];
	dummyData?: any[];
	setData: (dummyData: any[]) => void;
	searchColumn: string;
	hidesearchbar?: boolean;
}) {
	const [filters, setFilters] = useState<
		{
			[key: string]: {
				value: string | number | boolean | string[];
				type: 'string' | 'number' | 'boolean' | 'options';
				operand:
					| 'equals'
					| 'contains'
					| 'starts with'
					| 'ends with'
					| 'less than'
					| 'greater than'
					| 'not equals';
				options?: { value: string; label: string }[];
			};
		}[]
	>([]);

	useEffect(() => {
		setData(
			dummyData?.filter((row) => {
				for (const filter of filters) {
					const column = Object.keys(filter)[0];
					const operand = filter[column].operand;
					const value = filter[column].value;
					const type = filter[column].type;
					const rowValue = row[column];
					if (type === 'string') {
						if (operand === 'equals') {
							if (rowValue !== value) {
								return false;
							}
						} else if (operand === 'contains') {
							if (!rowValue.includes(value)) {
								return false;
							}
						} else if (operand === 'starts with') {
							if (!rowValue.startsWith(value)) {
								return false;
							}
						} else if (operand === 'ends with') {
							if (!rowValue.endsWith(value)) {
								return false;
							}
						} else if (operand === 'not equals') {
							if (rowValue === value) {
								return false;
							}
						}
					} else if (type === 'number') {
						if (operand === 'equals') {
							if (rowValue !== value) {
								return false;
							}
						} else if (operand === 'less than') {
							if (rowValue >= value) {
								return false;
							}
						} else if (operand === 'greater than') {
							if (rowValue <= value) {
								return false;
							}
						} else if (operand === 'not equals') {
							if (rowValue === value) {
								return false;
							}
						}
					} else if (type === 'boolean') {
						if (operand === 'equals') {
							if (rowValue !== (value === true)) {
								return false;
							}
						} else if (operand === 'not equals') {
							if (rowValue === (value === true)) {
								return false;
							}
						}
					} else if (type === 'options') {
						if (operand === 'equals') {
							if (!(value as string[]).includes(rowValue)) {
								return false;
							}
						} else if (operand === 'not equals') {
							if ((value as string[]).includes(rowValue)) {
								return false;
							}
						}
					}
				}
				return true;
			}) || []
		);
	}, [dummyData, filters]);

	return (
		<div className="flex sticky h-[93vh] w-[20%] flex-col gap-5 bg-secondary-900">
			{!hidesearchbar && (
				<Searchbar
					data={dummyData ?? []}
					setData={setData}
					searchColumn={searchColumn}
				/>
			)}
			<DropdownMenu.Root modal={false}>
				<DropdownMenu.Trigger
					className="flex w-fit items-center gap-2 rounded-2xl bg-primary-700  p-2 mt-4 text-sm sm:text-base"
					style={{ backgroundColor: 'rgb(123 201 214)' }}
				>
					<PlusCircle size={20} />
					Add Filter
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={5}
						className="z-10 min-w-[100px] rounded-xl border bg-white p-2 text-center shadow-md"
					>
						{columnFilters?.map((filter, i) => (
							<DropdownMenu.DropdownMenuSub key={i}>
								<DropdownMenu.SubTrigger
									className="cursor-pointer rounded-md px-2 py-1 outline-none hover:bg-accent hover:text-white"
									key={i}
								>
									{filter.label}
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent
										sideOffset={5}
										className="z-10 flex gap-2 rounded-xl border bg-white p-2 text-center shadow-md"
									>
										<DropDownMenuFilter
											columnFilter={filter}
											filters={filters}
											setFilters={setFilters}
										/>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.DropdownMenuSub>
						))}
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
			{filters.map((filter, i) => (
				<div
					key={i}
					className="mr-2 flex items-center justify-between rounded-md bg-primary-700 px-2 py-1"
				>
					{
						columnFilters.find(
							(columnFilter) => columnFilter.id === Object.keys(filter)[0]
						)?.label
					}{' '}
					{filter[Object.keys(filter)[0]].operand}{' '}
					{filter[Object.keys(filter)[0]].value}
					<button
						type="button"
						className="ml-2"
						onClick={() => {
							setFilters(filters.filter((_, j) => i !== j));
						}}
					>
						<MinusCircle size={20} className="hover:text-red-500" />
					</button>
				</div>
			))}
		</div>
	);
}
