import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../Components/shadcn/ui/form';
import { Input } from '../../Components/shadcn/ui/input';
import { useFormContext } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../Components/shadcn/ui/select';

export default function OrganisationForm() {
	const { control } = useFormContext();

	return (
		<>
			<FormField
				control={control}
				name="address"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px] w-full">
						<FormLabel>Organization Address</FormLabel>
						<FormControl>
							<Input placeholder="123 Main St." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="area"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel>Area</FormLabel>
							<FormControl>
								<Input placeholder="Area" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="City" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={control}
				name="organizationName"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px]">
						<FormLabel>Organization Name</FormLabel>
						<FormControl>
							<Input placeholder="resala" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="organizationType"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px]">
						<FormLabel>Organisation Type</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select the type of your orgnaisation" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="school">School</SelectItem>
								<SelectItem value="hospital">Hospital</SelectItem>
								<SelectItem value="church">Church</SelectItem>
								<SelectItem value="mosque">Mosque</SelectItem>
								<SelectItem value="nonprofit">Non-Profit</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="proof_work"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px]">
							<FormLabel>Proof of Organization</FormLabel>
							<FormControl>
								<Input
									className="flex rounded-full border space-x-2"
									id="file"
									type="file"
									multiple={true}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="proof"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px]">
							<FormLabel>Proof being part of Organization</FormLabel>
							<FormControl>
								<Input
									className="flex rounded-full border space-x-2"
									id="file"
									type="file"
									multiple={true}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
}
