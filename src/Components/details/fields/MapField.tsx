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

export default function MapField({
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
	const latitude = 40.9660006;
	const longitude = 28.7953517;
	const map = (
		<iframe
			src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13835.270888790787!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac655d269c4e7%3A0x6cd24ca540cbe444!2sCentral%20Hospital!5e0!3m2!1sen!2str!4v1621405900164!5m2!1sen!2str`}
			width="600"
			height="450"
			allowFullScreen
			className="border-[#171A21] border border-solid rounded-lg"
			aria-hidden="false"
		/>
	);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col h-[400px]">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<>
							{addEditMode ? (
								<>
									<FormControl>
										<Input
											placeholder={placeholder}
											{...field}
											type="text"
											className={inputClassName}
										/>
									</FormControl>
								</>
							) : (
								<span className="flex h-9 w-full rounded-md px-3 py-2 text-sm indent-px bg-slate-300">
									{value}
								</span>
							)}
							{map}
						</>
					</FormControl>
					<FormDescription>{description}</FormDescription>
					{addEditMode && <FormMessage />}
				</FormItem>
			)}
		/>
	);
}
