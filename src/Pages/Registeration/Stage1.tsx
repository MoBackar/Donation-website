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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Stage1({
	setFormType,
}: {
	setFormType: (type: 'donor' | 'organisation') => void;
}) {
	const { control, watch } = useFormContext();

	const selectedType = watch('type');

	useEffect(() => {
		setFormType(selectedType);
	}, [selectedType]);
	return (
		<>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="firstName"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								First Name
							</FormLabel>
							<FormControl>
								<Input
									className="shadow-inner"
									placeholder="ahmed"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="lastName"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								Last Name
							</FormLabel>
							<FormControl>
								<Input
									className="shadow-inner"
									placeholder="mohamed"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="userName"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								Email
							</FormLabel>
							<FormControl>
								<Input
									className="shadow-inner"
									placeholder="ahmed123@gmail.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="contactNumber"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								Contact Number
							</FormLabel>
							<FormControl>
								<Input
									className="shadow-inner"
									placeholder="01000100022"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="gender"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								Gender
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="shadow-inner">
										<SelectValue placeholder="Select your gender" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">Female</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="type"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								I am a
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="shadow-inner">
										<SelectValue placeholder="Select which type of user you are" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="donor">Donor</SelectItem>
									<SelectItem value="organisation representative">
										Organisation Representative
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={control}
				name="password"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px] w-72">
						<FormLabel className="text-base font-heading ml-1">
							Password
						</FormLabel>
						<FormControl>
							<Input
								className="shadow-inner"
								placeholder="password123"
								type="password"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="confirmPassword"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px] w-72">
						<FormLabel className="text-base font-heading ml-1">
							Confirm Password
						</FormLabel>
						<FormControl>
							<Input
								className="shadow-inner"
								placeholder="password123"
								type="password"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
