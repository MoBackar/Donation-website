import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '../../../Components/shadcn/ui/form';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import Details from '../../../Components/details/Details';
import TextField from '../../../Components/details/fields/TextField';
import { TDonorSettings } from '../../../types';
import { useEffect } from 'react';

const donor = {
	firstName: 'farida',
	lastName: 'ahmed',
	gender: 'female',
	phoneNumber: '01125599887',
	email: 'farida.mohamed@yahoo.com',
	address: 'nasr city building 6',
	city: 'cairo',
	area: 'nasr city',
	governorate: 'cairo',
};

export default function DonorSettings() {
	const formSchema = z.object({
		firstName: z.string().min(2, {
			message: 'First name must be at least 3 characters.',
		}),
		lastName: z.string().min(2, {
			message: 'Last name must be at least 3 characters.',
		}),
		gender: z.string().min(2, {
			message: 'Gender must be at least 3 characters.',
		}),
		phoneNumber: z.string().min(11, {
			message: 'Phone number must be at least 11 characters.',
		}),
		email: z.string().email({
			message: 'Invalid email format.',
		}),
		address: z.string().min(2, {
			message: 'Address must be at least 10 characters.',
		}),
		city: z.string().min(2, {
			message: 'City name must be at least 2 characters.',
		}),
		area: z.string().min(2, {
			message: 'Area name must be at least 5 characters.',
		}),
		governorate: z.string().min(2, {
			message: 'Governorate name must be at least 5 characters.',
		}),
	});

	const form = useForm<TDonorSettings>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: undefined,
			lastName: undefined,
			gender: undefined,
			phoneNumber: undefined,
			email: undefined,
			address: undefined,
			city: undefined,
			area: undefined,
			governorate: undefined,
		},
	});

	useEffect(() => {
		setTimeout(() => {
			form.reset(donor);
		}, 0);
	}, []);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Settings" id="1">
				<Details replacementTitle="Settings">
					<div className="grid grid-cols-2 p-6 gap-x-12">
						<TextField
							name="firstName"
							label="First Name"
							description="Your first name"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter first name..."
						/>
						<TextField
							name="lastName"
							label="Last Name"
							description="Your last name"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter last name..."
						/>
						<TextField
							name="gender"
							label="Gender"
							description="Your gender"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter phone number..."
						/>
						<TextField
							name="phoneNumber"
							label="Phone Number"
							description="Your phone number"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter phone number..."
						/>
						<TextField
							name="email"
							label="Email"
							description="Your email"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter email..."
						/>
						<TextField
							name="address"
							label="Address"
							description="Your address"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter address..."
						/>
						<TextField
							name="city"
							label="City"
							description="Your city"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter city..."
						/>
						<TextField
							name="area"
							label="Area"
							description="Your area"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter area..."
						/>
						<TextField
							name="governorate"
							label="Governorate"
							description="Your governorate"
							detailsClassName=""
							inputClassName=""
							placeholder="Enter governorate..."
						/>
					</div>
				</Details>
			</DetailsContextProvider>
		</Form>
	);
}
