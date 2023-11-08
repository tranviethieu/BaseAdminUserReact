export interface TypeFormEditProfile {}

export interface TypeAddress {
	id: number | null;
	name: string;
}

export interface TypeForm {
	fullname: string;
	username: string;
	email: string;
	phone: string;
	genderId: number;
	dateOfBirth: string | null;
	idCart: number;
	specialist: string;
	position: string;
	provinceId: number | null;
	districtId: number | null;
	wardId: number | null;
	specificAddress: string;
	description: string;
}
