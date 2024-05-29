import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import TopBar from './Components/TopBar';
import Login from './Pages/Login';
import Register from './Pages/Registeration/Register';

{
	/* Home Pages*/
}
import DonorHome from './Pages/Donor/Home';
import OrgHome from './Pages/Organisation/Home';
import AdminHome from './Pages/Admin/Home';

{
	/* Donor Views Pages*/
}
import Toys from './Pages/Donor/Views/Toys';
import Clothes from './Pages/Donor/Views/Clothes';
import Foods from './Pages/Donor/Views/Foods';
import MedicalSupplies from './Pages/Donor/Views/MedicalSupplies';
import SchoolSupplies from './Pages/Donor/Views/SchoolSupplies';
import Bloods from './Pages/Donor/Views/Bloods';
import DonorRequests from './Pages/Admin/Views/DonorRequests';
import Orgs from './Pages/Donor/Views/Orgs';
import TeachingPosts from './Pages/Donor/Views/TeacherPosts';
import MedicalCases from './Pages/Donor/Views/MedicalCases';

import DonorSettings from './Pages/Donor/Settings/DonorSettings';

{
	/* Donor Details Pages*/
}
import Blood from './Pages/Donor/Details/Blood';
import Book from './Pages/Donor/Details/Book';
import Cloth from './Pages/Donor/Details/Cloth';
import Food from './Pages/Donor/Details/Food';
import MedicalCase from './Pages/Donor/Details/MedicalCase';
import MedicalSupply from './Pages/Donor/Details/MedicalSupply';
import Org from './Pages/Donor/Details/Org';
import Stationary from './Pages/Donor/Details/Stationary';
import TeachingPost from './Pages/Donor/Details/Teacher';
import Toy from './Pages/Donor/Details/Toy';

{
	/* Organisation Views Pages*/
}
import Fulfilled from './Pages/Organisation/Views/Fulfilled';
import UnFulfilled from './Pages/Organisation/Views/UnFulfilled';
import Notifications from './Pages/Organisation/Views/Notifications';

{
	/* Organisation Details Pages*/
}

{
	/* Admin Views Pages*/
}
import AccountSettings from './Pages/Admin/Settings/AdminSettings';
import RegisteredOrganizations from './Pages/Admin/Views/RegisteredOrganizations';
import OrganizationRequests from './Pages/Admin/Views/OrganizationRequests';

{
	/* Admin Details Pages*/
}

import RegisteredOrganizationDetails from './Pages/Admin/Details/RegisteredOrganizationsDetails';

import { Toaster } from './Components/shadcn/ui/toaster';
import AdminSettings from './Pages/Admin/Settings/AdminSettings';
import SchoolSupply from './Pages/Donor/Details/SchoolSupply';
import OrganisationSettings from './Pages/Organisation/Settings/OrganisationSettings';
import Donors from './Pages/Admin/Views/Donors';
import OrganisationHome from './Pages/Organisation/Home';
import CreatePost from './Pages/Organisation/Details/CreatePost';
import Post from './Pages/Organisation/Details/Post';

function App() {
	return (
		<BrowserRouter>
			<TopBar />
			<Toaster />
			<div
				id="dialog"
				className="custom-scrollbar absolute flex h-screen w-full items-center justify-center empty:hidden"
			/>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* Admin Pages*/}
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/DonorRequests" element={<DonorRequests />} />
				<Route
					path="/admin/RegisteredOrganizations"
					element={<RegisteredOrganizations />}
				/>
				<Route
					path="/admin/OrganizationsRequests"
					element={<OrganizationRequests />}
				/>
				<Route
					path="/admin/RegisteredOrganizations/:id"
					element={<RegisteredOrganizationDetails />}
				/>
				<Route path="/admin/donors/" element={<Donors />} />

				<Route path="/admin/settings" element={<AdminSettings />} />
				{/* Donor Pages*/}
				<Route path="/donor" element={<DonorHome />} />
				<Route path="/donor/toys" element={<Toys />} />
				<Route path="/donor/toys/:id" element={<Toy />} />
				<Route path="/donor/clothes" element={<Clothes />} />
				<Route path="/donor/clothes/:id" element={<Cloth />} />
				<Route path="/donor/food" element={<Foods />} />
				<Route path="/donor/food/:id" element={<Food />} />
				<Route path="/donor/settings" element={<DonorSettings />} />
				<Route path="/donor/medical-supplies" element={<MedicalSupplies />} />
				<Route path="/donor/medical-supplies/:id" element={<MedicalSupply />} />
				<Route path="/donor/school-supplies" element={<SchoolSupplies />} />
				<Route path="/donor/school-supplies/:id" element={<SchoolSupply />} />
				<Route path="/donor/blood-donation" element={<Bloods />} />
				<Route path="/donor/blood-donation/:id" element={<Blood />} />
				<Route path="/donor/organizations" element={<Orgs />} />
				<Route path="/donor/organizations/:id" element={<Org />} />
				<Route path="/donor/teaching" element={<TeachingPosts />} />
				<Route path="/donor/teaching/:id" element={<TeachingPost />} />
				<Route path="/donor/medical-cases" element={<MedicalCases />} />
				<Route path="/donor/medical-cases/:id" element={<MedicalCase />} />

				{/* Organisation Pages*/}
				<Route path="/organisation" element={<OrganisationHome />} />
				<Route
					path="/organisation/settings"
					element={<OrganisationSettings />}
				/>
				<Route path="/organisation/fulfilled-posts" element={<Fulfilled />} />
				<Route path="/organisation/fulfilled-posts/:id" element={<Post />} />
				<Route
					path="/organisation/unfulfilled-posts"
					element={<UnFulfilled />}
				/>
				<Route path="/organisation/unfulfilled-posts/:id" element={<Post />} />
				<Route path="/organisation/notifications" element={<Notifications />} />
				<Route path="/organisation/create-post" element={<CreatePost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
