import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../shadcn/ui/form';
import { Textarea } from '../../shadcn/ui/textarea';
import { useDetailsContext } from '../useDetailsContext';

export default function TextareaField({
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
	const value = watch(name);
	const { addEditMode } = useDetailsContext();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col min-h-9">
					<FormLabel className="text-base font-heading ml-1">{label}</FormLabel>
					{addEditMode ? (
						<>
							<FormControl>
								<Textarea
									placeholder={placeholder}
									{...field}
									className={
										inputClassName + 'resize-none bg-slate-300 border-black'
									}
								/>
							</FormControl>
						</>
					) : (
						<span className="flex min-h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
							{value}
						</span>
					)}
					<FormDescription>{description}</FormDescription>
					{addEditMode && <FormMessage />}
				</FormItem>
			)}
		/>
	);
}
