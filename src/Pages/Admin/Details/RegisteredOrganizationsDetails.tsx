import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { organizations } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { Organization } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import { useEffect } from 'react';
import Details from '../../../Components/details/Details';
import MapField from '../../../Components/details/fields/MapField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function RegisteredOrganizationDetails() {
	const { id } = useParams<{ id: string }>();
	const organization = organizations.find((item) => item.id.toString() === id);

	const formschema = z.object({
		name: z
			.string({
				message: 'Please enter a valid name.',
			})
			.min(2, {
				message: 'Name must be at least 2 characters.',
			}),
		type: z
			.string({
				message: 'Please enter a valid type.',
			})
			.min(2, {
				message: 'Type must be at least 2 characters.',
			}),
		street: z
			.string({
				message: 'Please enter a valid street.',
			})
			.min(2, {
				message: 'Street must be at least 2 characters.',
			}),
		city: z
			.string({
				message: 'Please enter a valid city.',
			})
			.min(2, {
				message: 'City must be at least 2 characters.',
			}),
		state: z
			.string({
				message: 'Please enter a valid state.',
			})
			.min(2, {
				message: 'State must be at least 2 characters.',
			}),
		zip: z
			.string({
				message: 'Please enter a valid zip.',
			})
			.min(2, {
				message: 'Zip must be at least 2 characters.',
			}),
		contactEmail: z
			.string({
				message: 'Please enter a valid contact email.',
			})
			.min(2, {
				message: 'Contact email must be at least 2 characters.',
			}),
		location: z
			.object({
				lat: z.number(),
				lng: z.number(),
			})
			.optional(),
	});

	const form = useForm<Organization>({
		resolver: zodResolver(formschema),
		defaultValues: {
			id: undefined,
			name: '',
			type: '',
			street: '',
			area: '',
			gov: '',
			contactEmail: '',
			status: 'approved',
		},
	});

	useEffect(() => {
		if (organization) {
			form.reset(organization);
		}
	}, [organization]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Organisation" id={id} canEdit={false}>
				<Details>
					<div className="grid grid-cols-2 gap-5 p-6">
						<TextField
							name="name"
							label="Name"
							description="Name of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="type"
							label="Type"
							description="Type of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="street"
							label="Street"
							description="Street of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="area"
							label="Area"
							description="Area of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gov"
							label="Governorate"
							description="Governorate of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="contactPhone"
							label="Contact Phone"
							description="Contact Phone of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="contactEmail"
							label="Contact Email"
							description="Contact email of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<MapField
							name="location"
							label="Location"
							description="Location of the organization"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
					</div>
				</Details>
			</DetailsContextProvider>
		</Form>
	);
}
