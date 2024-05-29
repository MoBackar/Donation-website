import { ColumnDef } from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactSelect from 'react-select';

export default function DropDownMenuFilter({
	columnFilter,
	filters,
	setFilters,
}: {
	columnFilter: {
		id: string;
		label: string;
		type: 'string' | 'number' | 'boolean' | 'options';
		options?: { value: string; label: string }[];
	};
	filters: {
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
	}[];
	setFilters: Dispatch<
		SetStateAction<
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
		>
	>;
}) {
	const [filter, setFilter] = useState<{
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
	}>({
		value: '',
		type: 'string',
		operand: 'equals',
		options: [],
	});

	const options = {
		string: [
			{ label: 'equals', value: 'equals' },
			{ label: 'contains', value: 'contains' },
			{ label: 'starts with', value: 'starts with' },
			{ label: 'ends with', value: 'ends with' },
		],
		number: [
			{ label: 'equals', value: 'equals' },
			{ label: 'less than', value: 'less than' },
			{ label: 'greater than', value: 'greater than' },
		],
		boolean: [
			{ label: 'equals', value: 'equals' },
			{ label: 'not equals', value: 'not equals' },
		],
		options: [
			{ label: 'equals', value: 'equals' },
			{ label: 'not equals', value: 'not equals' },
		],
	};

	console.log(filter);

	return (
		<>
			<ReactSelect
				className="w-44"
				options={
					options[
						columnFilter.type as 'string' | 'number' | 'boolean' | 'options'
					]
				}
				onChange={(option) => {
					if (option?.value)
						setFilter({
							...filter,
							operand: option.value as
								| 'equals'
								| 'contains'
								| 'starts with'
								| 'ends with'
								| 'less than'
								| 'greater than'
								| 'not equals',
						});
				}}
			/>
			{columnFilter.type === 'string' && (
				<input
					type="text"
					className="w-1/2 outline outline-black outline-1 rounded-xl"
					onChange={(e) => {
						setFilter({
							...filter,
							value: e.target.value,
							type: 'string',
						});
					}}
				/>
			)}
			{columnFilter.type === 'number' && (
				<input
					type="number"
					className="w-1/2 outline outline-black outline-1 rounded-xl"
					onChange={(e) => {
						setFilter({
							...filter,
							value: e.target.value,
							type: 'number',
						});
					}}
				/>
			)}
			{columnFilter.type === 'boolean' && (
				<ReactSelect
					className="w-1/2"
					options={[
						{ label: 'true', value: true },
						{ label: 'false', value: false },
					]}
					onChange={(option) => {
						if (option)
							setFilter({
								...filter,
								value: option.value,
								type: 'boolean',
							});
					}}
				/>
			)}
			{columnFilter.type === 'options' && (
				<ReactSelect
					className="w-1/2"
					options={columnFilter.options}
					isMulti
					onChange={(option) => {
						if (option)
							setFilter({
								...filter,
								value: option.map((o) => o.value),
								type: 'options',
							});
					}}
				/>
			)}
			<button
				className="flex items-center justify-center bg-blue-500 rounded-full w-10 h-10 text-white font-bold cursor-pointer"
				onClick={() => {
					setFilters([...filters, { [columnFilter.id as string]: filter }]);
				}}
			>
				<PlusCircle size={24} />
			</button>
		</>
	);
}
