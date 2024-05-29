import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../shadcn/ui/form';
import { Input } from '../../shadcn/ui/input';
import { useDetailsContext } from '../useDetailsContext';
import { ChangeEvent } from 'react';

export default function ImageField({
	name,
	label,
	placeholder,
	description,
	inputClassName,
	detailsClassName,
}: {
	name: string;
	label: string;
	placeholder: string;
	description: string;
	inputClassName: string;
	detailsClassName: string;
}) {
	const form = useFormContext();
	const { watch } = form;
	const { addEditMode } = useDetailsContext();

	const preview = watch(name);

	const image = (
		<div className="h-40 bg-slate-300 flex w-full items-center justify-center rounded-lg">
			<img
				src={preview}
				alt={label}
				className="w-64 h-40 border-[#171A21] border border-solid rounded-lg "
			/>
		</div>
	);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field: { onChange, value, ...field } }) => (
				<FormItem className="flex flex-col h-[400px]">
					<FormLabel>{label}</FormLabel>
					{addEditMode ? (
						<>
							<FormControl>
								<Input
									placeholder={placeholder}
									{...field}
									type="file"
									className={inputClassName}
									onChange={(event) => {
										const { displayUrl } = getImageData(event);
										onChange(displayUrl);
									}}
								/>
							</FormControl>
						</>
					) : value ? (
						image
					) : (
						<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
							No image yet!
						</span>
					)}
					<FormDescription>{description}</FormDescription>
					{addEditMode && <FormMessage />}
				</FormItem>
			)}
		/>
	);
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
	// FileList is immutable, so we need to create a new one
	const dataTransfer = new DataTransfer();

	// Add newly uploaded images
	Array.from(event.target.files!).forEach((image) =>
		dataTransfer.items.add(image)
	);

	const files = dataTransfer.files;
	const displayUrl = URL.createObjectURL(event.target.files![0]);

	return { files, displayUrl };
}
