export type User = {
	username: string;
	password: string;
	type: 'organisation' | 'donor' | 'admin';
	donorType?: 'regular' | 'doctor' | 'teacher';
};
export type Organization = {
	id: number;
	name: string;
	img: string;
	type: string;
	street: string;
	area: string;
	gov: string;
	contactEmail: string;
	contactPhone: string;
	status: 'approved' | 'pending' | 'rejected';
};

export type Donor = {
	firstname: string;
	secondname: string;
	type: 'regular' | 'doctor' | 'teacher';
	area: string;
	gov: string;
	email: string;
	contactPhone: string;
	status: 'approved' | 'pending' | 'rejected';
};

export type TLoginForm = {
	username: string;
	password: string;
};

export type TRegisterForm = {
	firstName: string;
	lastName: string;
	gender: string;
	email: string;
	password: string;
	confirmPassword: string;
	phoneNumber: number;
	address: string;
	area: string;
	gov: string;
	type: 'organisation' | 'doctor' | 'teacher';
} & (DoctorRegisterForm | OrganizationRegisterForm | TeacherRegisterForm | {});

export type DoctorRegisterForm = {
	type: 'doctor';
	medicalLicense: string;
	specialty: string;
	cases: number;
};
export type TeacherRegisterForm = {
	type: 'teacher';
	education: string;
	subject: string;
	cases: number;
};

export type OrganizationRegisterForm = {
	type: 'organization';
	Name: string;
	Type: string;
};

export type TCategories =
	| 'Clothes'
	| 'Toys'
	| 'Food'
	| 'Medical Supplies'
	| 'School Supplies'
	| 'Blood Donation'
	| 'Teaching Post'
	| 'Medical Case'
	| string;

export type TDonationForm = {
	amount: number;
	cause: string;
};

export type TDonationItem = {
	id: number;
	name: string;
	img: string;
	quantity?: number;
};

export type TSchoolSuppliesItem = TStationaryItem | TBookItem;

export type TStationaryItem = {
	itemType: 'stationary';
	type: string;
} & TDonationItem;

export type TBookItem = {
	itemType: 'book';
	bookName: string;
	author: string;
	language: string;
	edition: string;
	summary: string;
} & TDonationItem;

export type TClothesItem = {
	type: string;
	ageGroup: string;
	season: string;
	material: string;
	gender: string;
} & TDonationItem;

export type TToyItem = {
	type: string;
	ageGroup: string;
	gender: 'male' | 'female' | 'all';
	category:
		| 'board games'
		| 'stuffed toys'
		| 'dolls'
		| 'sports'
		| 'cars'
		| 'Outdoor';
} & TDonationItem;

export type TFoodItem = {
	type: 'fresh' | 'canned' | 'baked' | 'fruits and vegetables';
} & TDonationItem;

export type TMedicalSupply = {
	type: string;
	use: string;
} & TDonationItem;

export type TBloodDonation = {
	volume: number;
	bloodType: string;
	hospital: string;
	area: string;
	gov: string;
	address: string;
} & TDonationItem;

export type TTeachingPost = {
	students: number;
	subject: string;
	area: string;
	gov: string;
} & TDonationItem;

export type TMedicalCase = {
	patientName: string;
	age: number;
	gender: string;
	weight: number;
	location: string;
	street: string;
	area: string;
	gov: string;
	specialty: string;
	description: string;
	orgName: string;
} & TDonationItem;

export type TNavigationMenuTab = {
	name: string;
	href?: string;
	key: string;
	links?: {
		name: string;
		key: string;
		href: string;
	}[];
};

export type TDonorSettings = {
	firstName: string;
	lastName: string;
	gender: string;
	phoneNumber: string;
	email: string;
	address: string;
	city: string;
	area: string;
	governorate: string;
};

export type TAdminSettings = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	address: string;
	city: string;
	area: string;
	password: string;
};

export type TOrganizationSettings = {
	firstName: string;
	lastName: string;
	gender: string;
	contactNumber: string;
	email: string;
	organisationName: string;
	organisationAddress: string;
	organisationType: string;
	city: string;
	area: string;
	governorate: string;
};

export type TOrgPost = {
	postCategory: string;
	condition: boolean;
	donor: Donor;
} & (
	| TFoodItem
	| TBloodDonation
	| TMedicalSupply
	| TToyItem
	| TClothesItem
	| TSchoolSuppliesItem
	| TMedicalCase
	| TTeachingPost
);


export type notification = {
	id: number;
	name: string;
	title: string;
	description: string;
};