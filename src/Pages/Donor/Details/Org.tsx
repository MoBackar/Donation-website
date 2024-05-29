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

export default function Org({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const organization = organizations.find((item) => item.id.toString() === id);

	const form = useForm<Organization>({
		defaultValues: {
			id: undefined,
			name: '',
			type: '',
			street: '',
			area: '',
			gov: '',
			contactEmail: '',
			contactPhone: '',
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
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
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
